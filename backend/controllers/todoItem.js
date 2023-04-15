const todoItem = require('../models/todoitem.model');
const {StatusCodes} = require('http-status-codes');

const getAllItems = async (req, res) => {
  const listId = req.body.listId;
  const items = await todoItem.find({"listId": listId});
  return res.status(StatusCodes.OK).json(items);
}

const createItem = async (req, res) => {
  const {name, listId} = req.body;
  const item = await todoItem.create({name, listId});
  return  res.status(StatusCodes.CREATED).json('Item added!');
}

const getItem = async (req, res) => {
  const item = await todoItem.findById(req.params.id)
  return res.status(StatusCodes.OK).json(item);
}

const deleteItem = async (req, res) => {
  const item = await todoItem.findByIdAndDelete(req.params.id);
  return res.status(StatusCodes.OK).json('Item deleted.');
}

const updateItem = async (req, res) => {
  const {name, done} = req.body;
  const item = await todoItem.findByIdAndUpdate(
    {_id: req.params.id},
    { name, done },
    {runValidators: true, new: true}  
  );
  console.log(done);

  return res.status(StatusCodes.OK).json(item);
}

module.exports = {
  getAllItems,
  createItem,
  getItem, 
  deleteItem,
  updateItem
}