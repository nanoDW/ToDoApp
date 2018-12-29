let Joi = require('joi');

function validateTodo(todo) {
    const schema = {
        nick: Joi.string().min(3).max(15).alphanum().required().trim(),
        description: Joi.string().min(10).max(160).required().trim(),
        days: Joi.number().integer().min(1).max(90).required(),
        priority: Joi.number().integer().min(1).max(5).required(),
        done: Joi.boolean().required()
    };
    return Joi.validate(todo, schema);
}

function validateUser(user) {
    const schema = {
        nick: Joi.string().min(3).max(15).alphanum().required().trim(),
        password: Joi.string().min(8).max(20).required().trim(),
        email: Joi.string().min(8).max(30).required().trim().email()
    };
    return Joi.validate(user, schema);
}

function validatePassword(user) {
    const schema = {
        id: Joi.string().min(8).max(50).required(),
        password: Joi.string().min(8).max(20).required().trim(),
    }
    return Joi.validate(user, schema);
}

function validateTodoEdited(user) {
    const schema = {
        priority: Joi.number().integer().min(1).max(5).required()
    }
    return Joi.validate(user, schema);
}

module.exports = {
    validateTodo: validateTodo,
    validateUser: validateUser,
    validatePassword: validatePassword,
    validateTodoEdited: validateTodoEdited
}