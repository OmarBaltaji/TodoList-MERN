const { BadRequestError, NotFoundError } = require('../errors');
const todoList = require('../models/todolist.model');
const { StatusCodes } = require('http-status-codes');

const getAllLists = async (req, res) => {
  const lists = await todoList.find();
  return res.status(StatusCodes.OK).json({count: lists.length, lists});
}

const createList = async (req, res) => {
  const { title } = req.body;

  if(!title) {
    throw new BadRequestError('Please provide title');
  }

  const list = await todoList.create({ title });
  return res.status(StatusCodes.CREATED).json({ list });
}
 
const getList = async (req, res) => {
  const {params: {id: listId}} = req;
  const list = await todoList.findById(listId);

  if(!list) {
    throw new NotFoundError(`List with id ${listId} does not exist`);
  }

  return res.status(StatusCodes.OK).json({ list });
}

const deleteList = async (req, res) => {
  const {params: {id: listId}} = req;
  const list = await todoList.findOneAndRemove({_id: listId});

  if(!list) {
    throw new NotFoundError(`List with id ${listId} does not exist`);
  }

  return res.status(StatusCodes.OK).json(`${list.title} deleted successfully`);
}

const updateList = async (req, res) => {
  const { title } = req.body;
  const {params: {id: listId}} = req;
  const list = await todoList.findByIdAndUpdate(
    {_id: listId},
    { title }, 
    { runValidators: true, new: true }
  );

  if(!list) {
    throw new NotFoundError(`List with id ${listId} does not exist`);
  }

  return res.status(StatusCodes.OK).json(`${list.title} updated successfully`);
}

module.exports = {
  getAllLists,
  createList,
  getList,
  deleteList,
  updateList
}