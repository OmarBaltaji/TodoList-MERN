const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const todoItemSchema = new Schema({
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        done: {
            type: Boolean,
            default: false,
        },
        listId: {
            type: ObjectId,
            ref: 'todoList',
        }
    },{
        timestamps: true,
});

const todoItem = mongoose.model('todoItem', todoItemSchema);

module.exports = todoItem;