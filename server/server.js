const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');


const {
    mongoose
} = require('./db/mongoose');
const {
    Todo
} = require('./models/todo');
const {
    User
} = require('./models/user');
const authenticate = require('./middleware/authenticate.js').authenticate;

const app = express();
const PORT = process.env.PORT || 3000;
app
    .use(express.static(__dirname + '/pages'))
    .use(bodyParser.json())
    .post('/todos', (req, res) => {
        console.log(new Date(), 'POST', req.route.path);
        let myTodo = new Todo({
            text: req.body.text
        });

        myTodo.save()
            .then(
                doc => res.status(200).send(doc),
                err => res.status(400).send(err));

    })
    .get('/todos', (req, res) => {
        console.log(new Date(), 'GET', req.route.path);
        Todo.find()
            .then(
                todos => res.send({
                    todos,
                }),
                err => res.status(400).send(err));
    })
    .get('/todos/:id', (req, res) => {
        let todo_id = req.params.id;
        console.log(new Date(), 'GET', req.route.path, todo_id);

        if (ObjectID.isValid(todo_id)) {
            Todo.findById(todo_id)
                .then(
                    usr => res.send({
                        usr
                    }).status(200),
                    err => res.status(400).send(err))
        } else res.status(404).send();

    })
    .patch('/todos/:id', (req, res) => {
        let todo_id = req.params.id;
        console.log(new Date(), 'PATCH', req.route.path, todo_id);

        if (ObjectID.isValid(todo_id)) {
            let body = _.pick(req.body, ["text", "completed"]);

            console.log(body);

            if (_.isBoolean(body.completed) && body.completed) {
                body.completedAt = new Date().getTime();
            } else {
                body.completedAt = null;
                body.completed = false;
            }

            Todo.findByIdAndUpdate(todo_id, {
                $set: body
            }, {
                new: true
            }).then(
                todo => {
                    if (todo) {
                        res.status(200).send(todo);
                    } else res.status(404).send();
                },
                err => res.status(400).send())
        } else res.status(404).send('ID IS NOT VALID');
    })

    .delete('/todos/:id', (req, res) => {
        let todo_id = req.params.id;
        console.log(new Date(), 'DEL', req.route.path, todo_id);

        if (ObjectID.isValid(todo_id)) {
            Todo.findByIdAndRemove(todo_id)
                .then(
                    todo => {
                        if (todo) res.status(200).send(todo)
                        else res.status(404).send("Todo was't found!");
                    },
                    err => res.status(400).send(err));
        } else res.status(404).send('ID IS NOT VALID');

    })
    .post('/users', (req, res) => {
        console.log(new Date(), 'POST', req.route.path);
        const props = [
            'email',
            'password',
            'last_name',
            'first_name',
            'tel',
            'date_of_birth',

        ];

        let usr_body = _.pick(req.body, props);
        let newUser = User(usr_body);
        newUser
            .save()
            .then(usr => usr.generateAuthToken())
            .then(token => res
                .header('x-auth', token)
                .send(newUser)
                .status(200))
            .catch(err => res.send(err).status(400));
    })
    .get('/users', (req, res) => {

        User.find()
            .then(users => res
                .send(users)
                .status(200),
                err => res
                .send(err)
                .status(400));
        console.log(new Date(), 'GET', req.route.path);
    })
    .get('/users/me', authenticate, (req, res) => {
        res.status(200).send(req.user);
    })
    .get('/users/:id', (req, res) => {
        let usr_id = req.params.id;
        console.log(new Date(), 'GET', req.route.path, usr_id);

        if (ObjectID.isValid(usr_id)) {
            User.findById(usr_id)
                .then(
                    usr => {
                        if (usr)
                            res.send({
                                usr
                            }).status(200)
                        else res.status(400).send()
                    },
                    err => res.status(400).send(err))
        } else res.status(404).send();

    })
    .patch('/users/:id', (req, res) => {
        let usr_id = req.params.id;
        console.log(new Date(), 'PATCH', req.route.path, usr_id);

        let body = _.pick(req.body, ["email", "tel", "first_name", "last_name"]);
        if (ObjectID.isValid(usr_id) && body.last_name) {

            console.log(body);

            User.findByIdAndUpdate(usr_id, {
                $set: body
            }, {
                new: true
            }).then(
                usr => {
                    if (usr) {
                        res.status(200).send(usr);
                    } else res.status(404).send();
                },
                err => res.status(400).send())
        } else res.status(404).send({
            errMess: 'ID IS NOT VALID OR INFO IS UNSUFFICIENT'
        });
    })
    .delete('/users/:id', (req, res) => {
        let usr_id = req.params.id;
        console.log(new Date(), 'DEL', req.route.path, usr_id);

        if (ObjectID.isValid(usr_id)) {
            User.findByIdAndRemove(usr_id)
                .then(
                    usr => {
                        if (usr) res.status(200).send(usr)
                        else res.status(404).send("User was't found!");
                    },
                    err => res.status(400).send(err));
        } else res.status(404).send('ID IS NOT VALID');

    })
    .get('/', (req, res) => {
        res.sendFile('welcome.html', {
            root: './server/pages'
        });
    })
    .listen(PORT, () => console.log(`server is up on port ${PORT}`));