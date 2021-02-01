const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoListSchema = new Schema({
      title: {
          type: String,
          required: true,
          trim: true,
          unique: true,
      },
    },{
        timestamps: true,
});

const todoList = mongoose.model('todoList', todoListSchema);

module.exports = todoList;