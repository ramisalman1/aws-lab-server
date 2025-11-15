require("dotenv").config();
const pgp = require("pg-promise")();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const db = pgp({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: true }
    : { rejectUnauthorized: false },
});

module.exports = db;
