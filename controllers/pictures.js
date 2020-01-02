const Controllers = require("../utils/controllers");

exports.pictures_get_all = (req, res) => {
  const queryString = "SELECT * FROM Photo";
  return Controllers.tableGetAll(queryString, res);
};

exports.pictures_get_picture = (req, res) => {
  const queryString = "SELECT * FROM Photo WHERE id=(?)";
  return Controllers.tableGetOne(queryString, req, res);
};

exports.pictures_delete_picture = (req, res) => {
  return Controllers.tableDeleteOne("Photo", req, res);
};
