// database/db.js
require("dotenv").config();
const pgp = require("pg-promise")();

const isProduction = process.env.NODE_ENV === "production";

const connectionString =
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
  `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const cn = isProduction
  ? {
      connectionString,
      ssl: {
        rejectUnauthorized: false, // for RDS
      },
    }
  : {
      connectionString,
    };

// Initialize pg-promise db client
const dbClient = pgp(cn);

const getTodoDb = async () => {
  try {
    const todos = await dbClient.any("SELECT * FROM todo");
    return todos;
  } catch (error) {
    console.error("getTodoDb error:", error);
    throw error;
  }
};

const addTodoDb = async (newItem) => {
  try {
    const todo = await dbClient.one(
      `INSERT INTO todo("newItem") VALUES ($1) RETURNING id, "newItem"`,
      [newItem]
    );
    return todo;
  } catch (error) {
    console.error("addTodoDb error:", error);
    throw error;
  }
};

const clearTodoDb = async () => {
  try {
    await dbClient.none("DELETE FROM todo");
  } catch (error) {
    console.error("clearTodoDb error:", error);
    throw error;
  }
};

module.exports = {
  getTodoDb,
  addTodoDb,
  clearTodoDb,
};
