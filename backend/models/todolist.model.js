const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoListSchema = new Schema({
      title: {
          type: String,
          required: [true, "Title is required"],
          trim: true,
          unique: true,
      },
      items: [{
        type: Schema.Types.ObjectId,
        ref: 'todoItem',
        select: false
      }]
    },{
        timestamps: true,
});

const todoList = mongoose.model('todoList', todoListSchema);

module.exports = todoList;