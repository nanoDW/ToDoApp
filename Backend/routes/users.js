const asyncMiddleware = require('../middleware/asyncMiddleware');
const error = require('../middleware/error');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
let _ = require('lodash');
const express = require("express");
const mongoDebugger = require("debug")("app:db");
const validate = require("../app/models/validate");
let Schemas = require("../app/models/schemas");

const router = express.Router();

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/todoapp")
    .then(() => mongoDebugger("Connected to the MongoDB"))
    .catch(err => mongoDebugger("Could not connect to the database", err));

router.get("/", auth, asyncMiddleware(async (req, res) => {
    const users = await Schemas.User.find().select('nick last');
    res.send(users);
}));

router.post("/", asyncMiddleware(async (req, res) => {
    const {
        error
    } = validate.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Schemas.User.findOne({
        $or: [{
            nick: req.body.nick
        }, {
            email: req.body.email
        }]
    });
    if (user) return res.status(400).send('User already exist');
    user = new Schemas.User({
        nick: req.body.nick,
        password: req.body.password,
        email: req.body.email,
        last: 0
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({
        _id: user._id
    }, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}));

router.get("/me", auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(400).send('User not exist.');
    res.send(user);
}));

router.put("/me/password", auth, asyncMiddleware(async (req, res) => {
    const {
        error
    } = validate.validatePassword(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await Schemas.User.updateOne({
        nick: req.params.nick
    }, {
        $set: {
            password: req.body.password
        }
    });
    res.send("Password has been changed");
}));

router.put("/me/number", auth, asyncMiddleware(async (req, res) => {
    let number = await Schemas.User.update({
        _id: req.body.id
    }, {
        $inc: {
            last: 1
        }
    });
    res.send(number);
}));

router.delete("/:nick", auth, asyncMiddleware(async (req, res) => {
    const user = await Schemas.User.deleteOne({
        nick: req.params.nick
    });
    if (!user) return res.status(400).send('User not exist.');
    res.send(user);
}));

module.exports = router;