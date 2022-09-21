const express = require("express");
const router = express.Router();
const TodosController = require("../../contrallers/todosController");
const { apiAuth } = require("../../middleware/auth");

router.get("/", TodosController.getTodosList);
router.post("/create", TodosController.createTodo);
router.get("/todo/:id", TodosController.getTodo);
router.delete("/delete/:id", TodosController.deleteTodo);

module.exports = router;
