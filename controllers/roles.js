const Controllers = require("../utils/controllers");

exports.roles_get_all = (req, res) => {
  const queryString = "SELECT * FROM role";
  return Controllers.tableGetAll(queryString, res);
};

exports.roles_get_role = (req, res) => {
  const queryString = "SELECT * FROM role WHERE id=(?)";
  return Controllers.tableGetOne(queryString, req, res);
};

exports.roles_add_role = (req, res) => {
  return Controllers.tableCreateOne("role", req, res);
};

exports.roles_update_role = (req, res) => {
  const authorizedKeys = ["name"];
  return Controllers.tableUpdateOne("role", authorizedKeys, req, res);
};

exports.roles_delete_role = (req, res) => {
  return Controllers.tableDeleteOne("role", req, res);
};
