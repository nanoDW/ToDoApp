const error = require('../middleware/error');
let startupDebugger = require('debug')('app:startup');
let auth = require('../routes/auth');
let users = require('../routes/users');
let todos = require('../routes/todos');
let express = require('express');
let helmet = require('helmet');
let morgan = require('morgan');
let config = require('config');

let app = express();

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

console.log('Working on ' + config.get('name'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('src'));
app.use(helmet());
app.use('/api/users', users);
app.use('/api/dashboard', todos);
app.use('/api/auth', auth);
app.use(error);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}

let port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});