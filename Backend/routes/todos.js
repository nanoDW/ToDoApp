const auth = require('../middleware/auth');
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

router.post("/", auth, async (req, res) => {
    const {
        error
    } = validate.validateTodo(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const todo = new Schemas.Todo({
        nick: req.body.nick,
        description: req.body.description,
        priority: req.body.priority,
        days: req.body.days,
        done: req.body.done,
        num: req.body.num
    });
    await todo.save();
    res.send(todo)
});

router.get("/me", auth, async (req, res) => {
    const todos = await Schemas.Todo.find({
            $and: [{
                nick: req.params.nick
            }, {
                done: false
            }]
        })
        .sort({
            date: 1
        })
        .select('_id description done priority');
    if (!todos) return res.status(404).send("You have no todos yet");
    res.send(todos);
});

router.get("/:nick/done", auth, async (req, res) => {
    const todos = await Schemas.Todo.find({
            $and: [{
                nick: req.params.nick
            }, {
                done: true
            }]
        })
        .sort({
            date: 1
        })
        .select('_id description done priority');
    if (!todos) return res.status(404).send("You have no todos yet");
    res.send(todos);
});


router.get("/todos/:id", auth, async (req, res) => {
    const todo = await Schemas.Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("This todo doesnt exist.");
    res.send(todo);
});

router.put("/todos/:id", auth, async (req, res) => {
    const {
        error
    } = validate.validateTodoEdited(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await Schemas.Todo.updateOne({
        _id: req.params.id
    }, {
        $set: {
            priority: req.body.priority
        }
    });
    res.send("Done!");
});

router.put("/todos/:id/done", auth, async (req, res) => {
    await Schemas.Todo.updateOne({
        _id: req.params.id
    }, {
        $set: {
            done: true
        }
    });
    res.send("Congrats!");
});

router.delete("/:id", auth, (req, res) => {
    const todo = req.params.id;
    Todo.deleteTodo(todo, cb => {
        res.send(JSON.stringify(cb));
    })

});

module.exports = router;