const getConnection = require("../db");

const Controller = require("../utils/controllers");

exports.users_get_all_user = (req, res) => {
  const queryString =
    "SELECT u.name AS username, u.email, u.status, u.telephone, u.token, r.name AS roleName FROM User AS u INNER JOIN role AS r ON u.role_id = r.id";
  return Controller.tableGetAll(queryString, res);
};

exports.users_get_user = (req, res) => {
  const queryString = `SELECT u.name AS username, u.email, u.status, u.telephone, u.token, r.name AS roleName FROM User AS u INNER JOIN role AS r ON u.role_id = r.id WHERE u.id= (?)`;
  return Controller.tableGetOne(queryString, req, res);
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
