// controllers/Todo.js
const todoDb = require("../database/db");

const getTodo = async (req, res) => {
  try {
    const todos = await todoDb.getTodoDb();

    if (todos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No todos found" });
    }

    res.status(200).json({ success: true, message: todos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { newItem } = req.body;
    const todo = await todoDb.addTodoDb(newItem);

    if (!todo) {
      return res
        .status(400)
        .json({ success: false, message: "Could not create todo" });
    }

    res.status(201).json({ success: true, message: todo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const clearTodo = async (req, res) => {
  try {
    await todoDb.clearTodoDb();
    res.status(200).json({ success: true, message: "Todos deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTodo,
  addTodo,
  clearTodo,
};
