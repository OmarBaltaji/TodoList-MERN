const todoList = require('../models/todolist.model');
const { StatusCodes } = require('http-status-codes');

const getAllLists = async (req, res) => {
  const lists = await todoList.find();
  return res.status(StatusCodes.OK).json(lists);
}

const createList = async (req, res) => {
  const title = req.body.title;
  const list = await todoList.create({ title });
  return res.status(StatusCodes.CREATED).json('List added!');
}
 
const getList = async (req, res) => {
  const list = await todoList.findById(req.params.id);
  return res.status(StatusCodes.OK).json(list);
}

const deleteList = async (req, res) => {
  const list = await todoList.findByIdAndDelete(req.params.id);
  return res.status(StatusCodes.OK).json('List deleted.');
}

const updateList = async (req, res) => {
  const { title } = req.body;
  const list = await todoList.findByIdAndUpdate(
    {_id: req.params.id},
    { title }, 
    { runValidators: true, new: true }
  );
  return res.status(StatusCodes.OK).json('List updated!');
}

module.exports = {
  getAllLists,
  createList,
  getList,
  deleteList,
  updateList
}