const router = require('express').Router();
let todoItem = require('../models/todoitem.model');

router.route('/').post((req, res) => {
    const listId = req.body.listId;

    todoItem.find({"listId": listId}, (err, items) => {
        if(err) return 'Error ' + err;

        return res.json(items);
    })
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const listId = req.body.listId;

    const newTodoItem = new todoItem({name, listId});

    newTodoItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    todoItem.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    todoItem.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    todoItem.findById(req.params.id)
    .then(item => {
        item.name = req.body.name ? req.body.name : item.name;
        item.done = req.body.done === true ? true : false;

        item.save()
        .then(() => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;