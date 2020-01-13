const Controllers = require("../utils/controllers");

exports.sizes_get_all = (req, res) => {
  const queryString = "SELECT * FROM Taille";
  return Controllers.tableGetAll(queryString, res);
};

exports.sizes_get_size = (req, res) => {
  const queryString = "SELECT * FROM Taille WHERE id=(?)";
  return Controllers.tableGetOne(queryString, req, res);
};

exports.sizes_add_size = (req, res) => {
  return Controllers.tableCreateOne("Taille", req, res);
};

exports.sizes_update_size = (req, res) => {
  const authorizedKeys = ["name"];
  return Controllers.tableUpdateOne("Taille", authorizedKeys, req, res);
};

exports.sizes_delete_size = (req, res) => {
  return Controllers.tableDeleteOne("Taille", req, res);
};
