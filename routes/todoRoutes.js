const express = require("express");
const {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
  clearTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodo);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.delete("/", clearTodo);

module.exports = router;
