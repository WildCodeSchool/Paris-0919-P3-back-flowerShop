const getConnection = require("../db");
const { setKeysValuesToString } = require("../utils/helpers");

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

const tableUpdateOne = (table, authorizedKeys, req, res) => {
  const { id } = req.params;
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);
  const isAuthorized = bodyKeys.every(key => authorizedKeys.includes(key));

  const setValues = setKeysValuesToString(bodyKeys, bodyValues);

  const queryString = `UPDATE ${table} SET ${setValues} WHERE id=(?)`;

  console.log(queryString);
  if (isAuthorized) {
    getConnection.query(queryString, [id], (error, result) => {
      const itemNotExists = result.affectedRows === 0;
      if (error || itemNotExists) {
        return res.status(500).json({
          message: "Failed to update item",
          queryString,
          error
        });
      }
      res.status(200).json({
        message: "Successfully updated item",
        queryString,
        result
      });
    });
  } else {
    res.status(500).json({
      message: "Update not authorized"
    });
  }
};

const tableDeleteOne = (table, req, res) => {
  const { id } = req.params;
  const queryString = `DELETE FROM ${table} WHERE id= (?)`;
  getConnection.query(queryString, [id], (error, results) => {
    const itemNotExist = results.affectedRows === 0;
    if (error || itemNotExist) {
      return res.status(500).json({
        message: `Item with id=${id} does not exists`,
        error
      });
    }
    res.status(200).json({
      message: "Item successfully deleted",
      id
    });
  });
};

module.exports = {
  tableGetAll,
  tableGetOne,
  tableCreateOne,
  tableUpdateOne,
  tableDeleteOne
};
