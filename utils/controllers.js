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

module.exports = { tableGetAll, tableGetOne };
