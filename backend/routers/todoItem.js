const router = require('express').Router();
const {getAllItems, createItem, getItem, deleteItem, updateItem} = require('../controllers/todoItem');


router.route('/').post(getAllItems);

router.route('/add').post(createItem);

router.route('/:id').delete(deleteItem).get(getItem).put(updateItem);

module.exports = router;