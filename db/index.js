const mysql = require("mysql2");
require("dotenv").config({ path: "./config/dev.env" });

const connectionMySql = mysql.createPool({
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DB
});

connectionMySql.getConnection((err, connection) => {
  if (err) {
    return console.error("Failed to connect to the db");
  }
  console.log("Successfully connected to the db");
});

module.exports = connectionMySql;
