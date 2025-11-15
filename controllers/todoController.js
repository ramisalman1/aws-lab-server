const {
  getTodoDb,
  addTodoDb,
  deleteTodoDb,
  clearTodoDb,
  updateTodoDb,
} = require("../db/queries");

const getTodo = async (req, res) => {
  try {
    const todos = await getTodoDb();

    if (todos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No todos found" });
    }

    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { newItem } = req.body;

    if (!newItem || newItem.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "newItem is required" });
    }

    const todo = await addTodoDb(newItem.trim());

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    await deleteTodoDb(id);
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { newItem } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Todo ID is required" });
    }

    if (!newItem || newItem.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "newItem is required" });
    }

    const todo = await updateTodoDb(id, newItem.trim());
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearTodo = async (req, res) => {
  try {
    await clearTodoDb();
    res.status(200).json({ success: true, message: "All todos deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
  clearTodo,
};
