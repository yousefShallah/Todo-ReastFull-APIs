const Todos = require("../models/todo");

async function findAllTodos(params) {
  const { page, userId } = params;
  const limit = 10;
  const pageCount = Math.max(0, page - 1);
  try {
    const todosList = await Todos.find({ userId })
      .limit(limit)
      .skip(limit * pageCount);
    const todosListCount = await Todos.find({ userId }).countDocuments();
    const data = {
      todosList,
      todosListCount,
    };
    return data;
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function createTodo(params) {
  try {
    const todo = new Todos(params);
    await todo.save();
    return todo;
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function findTodo(params) {
  try {
    const todo = await Todos.findOne(params);
    return todo;
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function deleteTodo(params) {
  try {
    const todo = await Todos.deleteOne(params);
    return todo;
  } catch (error) {
    console.log("Error", error.message);
  }
}

module.exports = {
  findAllTodos,
  createTodo,
  findTodo,
  deleteTodo,
};
