const getConnection = require("../db");

const tableGetAll = (table, res) => {
  const queryString = `SELECT * FROM ${table}`;
  getConnection.query(queryString, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to get ${table}`,
        error
      });
    }
    res.status(200).json(results);
  });
};

const tableGetOne = (table, req, res) => {
  const { id } = req.params;
  const queryString = `SELECT * FROM ${table} WHERE id= (?)`;
  getConnection.query(queryString, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Item with id=${id} does not exists`,
        error
      });
    }
    res.status(200).json(result);
  });
};

const tableCreateOne = (table, req, res) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const keysToString = keys.join(", ");
  const questionMarks = keys.map(key => `?`).join(", ");

  const queryString = `INSERT INTO ${table}(${keysToString}) VALUES (${questionMarks})`;

  getConnection.query(queryString, values, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to create item",
        error
      });
    }
    res.status(201).json({
      id: results.insertId,
      message: "Item successfully added"
    });
  });
};

module.exports = { tableGetAll, tableGetOne, tableCreateOne };
