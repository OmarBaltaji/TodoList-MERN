const router = require('express').Router();
let todoList = require('../models/todolist.model');

router.route('/').get((req, res) => {
    todoList.find()
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;

    const newTodoList = new todoList({title: title});

    newTodoList.save()
    .then(() => res.json('List added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    todoList.findById(req.params.id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    todoList.findByIdAndDelete(req.params.id)
    .then(() => res.json('List deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    todoList.findById(req.params.id)
    .then(list => {
        list.title = req.body.title;

        list.save()
        .then(() => res.json('List updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;