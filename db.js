const mysql = require("mysql2");
const config = require("./config/config");

const db = mysql.createConnection(config.db);

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
