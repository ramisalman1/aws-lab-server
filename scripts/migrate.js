require("dotenv").config();
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const migrate = async () => {
  try {
    const schemaPath = path.join(__dirname, "../database/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await db.query(schema);
    console.log("✓ Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("✗ Migration failed:", error.message);
    process.exit(1);
  }
};

migrate();
