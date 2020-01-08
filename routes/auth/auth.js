const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const getConnection = require("../../db");

router.post("/signup", (req, res) => {
  const { name, email, password, telephone, status, role_id } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to register password",
        err
      });
    }
    const queryString = `
        INSERT INTO User (name, email, password, telephone, status, role_id) 
        VALUES (?, ?, ?, ?, ?, ?)`;
    getConnection.query(
      queryString,
      [name, email, hash, telephone, status, role_id],
      (error, results) => {
        if (error) {
          return res.status(500).json({
            message: "Failed to register new user",
            error
          });
        }
        return res.status(200).json({
          results
        });
      }
    );
  });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({ message: info.message });
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    return res.status(200).json({ user, token });
  })(req, res, next);
});

module.exports = router;
