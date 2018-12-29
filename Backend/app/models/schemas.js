var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const todoSchema = new Schema({
    nick: String,
    description: String,
    priority: Number,
    done: Boolean,
    num: Number,
    date: {
        type: Date,
        default: Date.now
    },
    finish: {
        type: Date
    }
}, {
    collection: 'todos'
})

const userSchema = new Schema({
    nick: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    last: Number,
}, {
    collection: 'users'
})

module.exports = {
    User: mongoose.model('User', userSchema),
    Todo: mongoose.model('Todo', todoSchema)
};