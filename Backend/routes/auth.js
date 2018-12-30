const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
let _ = require('lodash');
const express = require("express");
const mongoDebugger = require("debug")("app:db");
let Schemas = require("../app/models/schemas");
const Joi = require('joi');

const router = express.Router();

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/todoapp")
    .then(() => mongoDebugger("Connected to the MongoDB"))
    .catch(err => mongoDebugger("Could not connect to the database", err));

router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Schemas.User.findOne({
        nick: req.body.nick
    });
    if (!user) return res.status(400).send('Invalid nick or password');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid nick or password');

    const token = jwt.sign({
        _id: user._id
    }, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

function validate(req) {
    const schema = {
        nick: Joi.string().min(3).max(15).alphanum().required().trim(),
        password: Joi.string().min(8).max(20).required().trim()
    };
    return Joi.validate(req, schema);
}

module.exports = router;