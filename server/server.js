const express = require('express');
const bodyParser = require('body-parser');

const {
    User
} = require('./models/user');
const {
    Todo
} = require('./models/todo2');


express()
    .use(bodyParser.json())
    .get('/', (req, resp) => resp.send('<p>the root page</p>'))
    .post('/todos', (req, resp) => {
        console.log(req.body);
        let newTodo = new Todo({
            text: req.body.text
        });
        newTodo
            .save()
            .then(
                doc => resp.status(200).send(doc),
                err => resp.status(400).send(err));
    })
    .listen(3000, () => console.log('Started on port 3000'))