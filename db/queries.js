const db = require("../config/db");

const getTodoDb = async () => {
  try {
    const todos = await db.query("SELECT * FROM todo ORDER BY id DESC");
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const addTodoDb = async (newItem) => {
  try {
    const todo = await db.query(
      `INSERT INTO todo (newitem) VALUES ($1) RETURNING id, newitem`,
      [newItem]
    );
    return todo[0];
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

const deleteTodoDb = async (id) => {
  try {
    await db.query(`DELETE FROM todo WHERE id = $1`, [id]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

const clearTodoDb = async () => {
  try {
    await db.query(`DELETE FROM todo`);
    return { success: true };
  } catch (error) {
    console.error("Error clearing todos:", error);
    throw error;
  }
};

const updateTodoDb = async (id, newItem) => {
  try {
    const todo = await db.query(
      `UPDATE todo SET newitem = $1 WHERE id = $2 RETURNING id, newitem`,
      [newItem, id]
    );
    return todo[0];
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

module.exports = {
  getTodoDb,
  addTodoDb,
  deleteTodoDb,
  clearTodoDb,
  updateTodoDb,
};
