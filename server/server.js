const express = require('express');
const bodyParser = require('body-parser');

const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/todo');
const {
    User
} = require('./models/user');

const app = express();

app
    .use(bodyParser.json())
    .post('/todos', (req, res) => {
        console.log(req.body);
        let myTodo = new Todo({
            text: req.body.text
        });

        myTodo.save()
            .then(
                doc => res.status(200).send(doc),
                err => res.status(400).send(err));

    })
    .get('/todos', (req, res) => {
        Todo.find()
            .then(
                todos => res.send({
                    todos,
                    customCode: 123
                }),
                err => res.status(400).send(err));
    })
    .post('/users', (req, res) => {
        
        let newUser = User({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            tel: req.body.tel
            // date_of_birth: (req.body.date_of_birth) ? req.body.date_of_birth : 0
        });
        newUser.save()
            .then(
                doc => res.send(doc).status(200),
                err => res.send(err).status(400));
    })
    .get('/users', (req, res) => {

        User.find()
            .then(users => res.send(users).status(200),
                err => res.send(err).status(400));
        console.log('GET', req.route.path);
    })
    .listen(3000, () => console.log('server is up on port 3000'))