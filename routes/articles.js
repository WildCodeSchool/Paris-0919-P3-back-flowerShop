const express = require("express");

const router = express.Router();

const connection = require("../db");

router.get("/", (req, res) => {
  connection.query();
});

router.get("/", (req, res) => {});

router.post("/", (req, res) => {});

router.post("", (req, res) => {});

module.exports = router;
