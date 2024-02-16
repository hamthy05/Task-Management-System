const { Task } = require("../models/TaskModel");

exports.getSearchTask = (req, res) => {
  const { task_name } = req.query;

  const filter = task_name
    ? { task_name: { $regex: new RegExp(task_name, "i") } }
    : {};

  Task.find(filter)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found!" });
      } else {
        return res.status(200).json({
          success: true,
          message: "Task found",
          data: data,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: err,
      });
    });
};
exports.getAllTask = async (req, res) => {
  const lowDetail = await Task.find({ priority: "low" });
  const mediumDetail = await Task.find({ priority: "medium" });
  const highDetail = await Task.find({ priority: "high" });

  if (!lowDetail || !mediumDetail || !highDetail) {
    return res.status(404).json({
      success: false,
      message: "Task not found!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Task found",
    lowDetail: lowDetail,
    mediumDetail: mediumDetail,
    highDetail: highDetail,
  });
};

exports.createTask = (req, res) => {
  if (req.body.priority == "") {
    req.body.priority = "medium";
  }
  const x = new Task({
    task_name: req.body.task_name,
    description: req.body.description,
    due_date: req.body.due_date,
    priority: req.body.priority,
    status: req.body.status,
  });
  x.save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Task created successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: err,
      });
    });
};

exports.deleteTask = (req, res) => {
  const { taskId } = req.params;

  Task.findByIdAndRemove(taskId)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found!",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: deletedTask,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: err,
      });
    });
};

exports.getOneTask = (req, res) => {
  Task.findOne({ _id: req.params.taskId })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found!" });
      } else {
        return res.status(200).json({
          success: true,
          message: `Task found`,
          data: data,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: true,
        message: "Something went wrong",
        data: err,
      });
    });
};

exports.updateTask = (req, res) => {
  // console.log(req.body);
  const updateData = {
    task_name: req.body.task_name,
    description: req.body.description,
    due_date: req.body.due_date,
    priority: req.body.priority,
  };

  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    { $set: updateData },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `Task is updated.`,
          data: data,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: true,
        message: "Something went wrong",
        data: err,
      });
    });
};
