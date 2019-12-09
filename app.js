const express = require("express");

const mysql = require("mysql2");
require("dotenv").config({ path: "./config/dev.env" });

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// autorise tous à faire des requêtes
app.use(cors());

// Connect to db

const connectionMySql = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DB
});

connectionMySql.connect(err => {
  if (err) {
    return console.error(err);
  }
  console.log("Successfully connected to db");
});

// Permet d'utiliser req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Si ne trouve pas de routes alors erreurs => gestion de l'erreur
app.use((req, res, next) => {
  const error = new Error("Page doesn't exists");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports = app;
