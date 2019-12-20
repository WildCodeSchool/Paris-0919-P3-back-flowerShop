const getConnection = require("../db");

exports.roles_get_all = (req, res) => {
  const queryString = "SELECT * FROM role";
  getConnection.query(queryString, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to get roles",
        error
      });
    }
    res.status(200).json(results);
  });
};

exports.roles_get_role = (req, res) => {
  const { roleId } = req.params;
  const queryString = "SELECT * FROM role WHERE id= (?)";
  getConnection.query(queryString, [roleId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Role with id=${roleId} does not exists`,
        error
      });
    }
    res.status(200).json(results);
  });
};

exports.roles_add_role = (req, res) => {
  const { name } = req.body;
  const queryString = "INSERT INTO role (name) values (?)";
  getConnection.query(queryString, [name], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to add role`,
        error
      });
    }
    res.status(201).json({
      id: results.insertId,
      role: {
        name
      }
    });
  });
};

exports.roles_update_role = (req, res) => {
  const { roleId } = req.params;
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);
  const authorizedKeys = ["name"];
  const isAuthorized = bodyKeys.every(key => authorizedKeys.includes(key));

  const changesString = bodyKeys
    .map((key, index) => `${key}="${bodyValues[index]}"`)
    .join(",");
  const queryString = `UPDATE role SET ${changesString} WHERE id=(?)`;
  if (isAuthorized) {
    getConnection.query(queryString, [roleId], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to update role",
          queryString,
          error
        });
      }
      res.status(200).json({
        message: "Successfully updated role",
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

exports.roles_delete_role = (req, res) => {
  const { roleId } = req.params;
  const queryString = "DELETE FROM role WHERE id= (?)";
  getConnection.query(queryString, [roleId], (error, results) => {
    const roleNotExist = results.affectedRows === 0;
    if (error || roleNotExist) {
      return res.status(500).json({
        message: `Role with id=${roleId} does not exists`,
        error
      });
    }
    res.status(200).json({
      message: "Role successfully deleted",
      roleId
    });
  });
};
