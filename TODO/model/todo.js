const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  todoname: { type: String, required: true },
  taskstatus: Boolean,
});

const todo = mongoose.model("Todo", todoSchema); // collections??
module.exports = todo;
