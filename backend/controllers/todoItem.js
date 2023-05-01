const todoItem = require('../models/todoitem.model');
const {StatusCodes} = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const todoList = require('../models/todolist.model');

const getAllItems = async (req, res) => {
  const listId = req.body.listId;

  if(!listId) {
    throw new BadRequestError("Please provide the list id in order to retrieve the list's items");
  }

  const items = await todoItem.find({"listId": listId});
  res.status(StatusCodes.OK).json({ count: items.length, items});
}

const createItem = async (req, res) => {
  const {name, listId} = req.body;

  if(!name) {
    throw new BadRequestError("Please provide the name of the item");
  }

  if(!listId) {
    throw new BadRequestError("Can't add an item without associating it to an existing list");
  }

  const item = await todoItem.create({name});
  
  await todoList.findByIdAndUpdate(
    { _id: listId },
    { $push: { items: item._id } },
    { runValidators: true }
  );

  res.status(StatusCodes.CREATED).json({ item });
}

const getItem = async (req, res) => {
  const { params: {id: itemId} } = req;
  const item = await todoItem.findById(itemId);

  if(!item) { 
    throw new NotFoundError(`Item with id ${itemId} does not exist`);
  }

  res.status(StatusCodes.OK).json({ item });
}

const deleteItem = async (req, res) => {
  const {params: {id: itemId}} = req;

  const item = await todoItem.findByIdAndDelete(itemId);

  if(!item ){
    throw new NotFoundError(`Item with id ${itemId} does not exist`);
  }

  return res.status(StatusCodes.OK).json(`Item: "${item.name}" deleted successfully`);
}

const updateItem = async (req, res) => {
  const {params: {id: itemId}, body: {name, done}} = req;
  const updatedBody = {}

  if(name)
    updatedBody.name = name;
  
  // since it is a boolean, it's better to check whether it is undefined or not to make sure if it is included the in the request
  if(done !== undefined) 
    updatedBody.done = done;

  const item = await todoItem.findByIdAndUpdate(
    { _id: itemId },
    { $set: { ...updatedBody } },
    { runValidators: true, new: true }  
  );

  if(!item) {
    throw new NotFoundError(`Item with id ${itemId} does not exist`);
  }

  return res.status(StatusCodes.OK).json({ item });
}

module.exports = {
  getAllItems,
  createItem,
  getItem, 
  deleteItem,
  updateItem
}