const router = require('express').Router();
const { getAllLists, createList, getList, deleteList, updateList } = require('../controllers/todoList');

router.route('/').get(getAllLists).post(createList);

router.route('/:id').get(getList).delete(deleteList).patch(updateList);

module.exports = router;