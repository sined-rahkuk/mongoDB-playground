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
    .listen(3000, () => console.log('server is up on port 3000'))