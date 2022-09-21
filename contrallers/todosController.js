const todosServices = require("../servicess/todoServices");

async function createTodo(req, res) {
  try {
    const todoDetails = req.body;
    const todo = await todosServices.createTodo({
      ...todoDetails,
      userId: req.user.userId,
    });
    res.status(201).json({ status: true, todo });
  } catch (error) {
    res.status(500).json({ status: false, error: `${error}` });
  }
}

async function getTodosList(req, res) {
  try {
    const { page } = req.query;
    const todo = await todosServices.findAllTodos({
      page: page ? page : 0,
      userId: req.user.userId,
    });
    res.status(201).json({ status: true, todo });
  } catch (error) {
    res.status(500).json({ status: false, error: `${error}` });
  }
}

async function getTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await todosServices.findTodo({
      _id: id,
      userId: req.user.userId,
    });
    if (todo) {
      res.status(200).json({ status: true, todo });
    } else {
      res
        .status(200)
        .json({ status: true, todo: {}, message: "No Todo with this Id!!!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const todo = await todosServices.deleteTodo({
      _id: id,
      userId: req.user.userId,
    });
    if (todo && todo.deletedCount != 0) {
      res.status(200).json({ status: true, message: "deleted successfully" });
    } else {
      res
        .status(404)
        .json({ status: false, todo: {}, message: "No Todo with this Id!!!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
}

module.exports = {
  getTodosList,
  createTodo,
  getTodo,
  deleteTodo,
};
