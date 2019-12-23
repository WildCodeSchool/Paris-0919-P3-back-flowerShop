const getConnection = require("../db");

const Controller = require("../utils/controllers");

exports.users_get_all_user = (req, res) => {
  const queryString =
    "SELECT u.name AS username, u.email, u.status, u.telephone, u.token, r.name AS roleName FROM User AS u INNER JOIN role AS r ON u.role_id = r.id";
  getConnection.query(queryString, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: `Failed to get user`,
        error
      });
    }
    res.status(200).json(results);
  });
};

exports.users_get_user = (req, res) => {
  const { id } = req.params;
  const queryString = `SELECT u.name AS username, u.email, u.status, u.telephone, u.token, r.name AS roleName FROM User AS u INNER JOIN role AS r ON u.role_id = r.id WHERE u.id= (?)`;
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

exports.users_add_user = (req, res) => {
  return Controller.tableCreateOne("User", req, res);
};

exports.users_update_user = (req, res) => {
  const authorizedKeys = [
    "name",
    "email",
    "status",
    "telephone",
    "token",
    "role_id"
  ];
  return Controller.tableUpdateOne("User", authorizedKeys, req, res);
};

exports.users_delete_user = (req, res) => {
  return Controller.tableDeleteOne("User", req, res);
};
