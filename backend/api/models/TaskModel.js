var mongoose = require("mongoose");
require("dotenv").config();

const SALT = 10;
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
  task_name: {
    type: String,
    required: [true, "task name field is required!"],
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "  required!"],
    maxlength: 100,
  },
  due_date: {
    type: String,
    maxlength: 100,
  },
  priority: {
    type: String,
    maxlength: 100,
    default: "medium",
  },
  status: {
    type: String,
    maxlength: 100,
    default: "todo",
  },
});

const Task = mongoose.model("task_lists", TaskSchema);
module.exports = { Task };
