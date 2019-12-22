const mysql = require("mysql2");
require("dotenv").config({ path: "./config/dev.env" });

// Connect to db
const getConnection = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: process.env.PWD_DB,
  database: process.env.NAME_DB
});

getConnection.connect(err => {
  if (err) {
    return console.error(err);
  }
  console.log("Successfully connected to db");
});

module.exports = getConnection;
