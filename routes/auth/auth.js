const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const getConnection = require("../../db");

router.get("/signup", (req, res) => {
  const { name, email, password, telephone, status, role_id } = req.body;
  bcrypt
    .hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to register password",
          err
        });
      }
      return hash;
    })
    .then(hash => {
      const queryString = `
        INSERT INTO User (name, email, password, telephone, status, role_id) 
        VALUES (?, ?, ?, ?, ?, ?)`;
      console.log(hash);
      getConnection.query(
        queryString,
        [name, email, hash, telephone, status, role_id],
        (error, results) => {
          if (error) {
            return res.status(500).json({
              message: "Failed to register new user",
              err
            });
          }
          return res.status(200).json({
            results
          });
        }
      );
    });
});

router.get("/signin", (req, res) => {});

module.exports = router;
