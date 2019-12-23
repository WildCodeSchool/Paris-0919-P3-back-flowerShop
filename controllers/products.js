const Controllers = require("../utils/controllers");

exports.products_get_all = (req, res) => {
  const queryString = "SELECT * FROM Produit";
  return Controllers.tableGetAll(queryString, res);
};

exports.products_get_product = (req, res) => {
  const queryString = "SELECT * FROM Produit Where id=(?)";
  return Controllers.tableGetOne(queryString, req, res);
};

exports.products_create_product = (req, res) => {
  return Controllers.tableCreateOne("Produit", req, res);
};

exports.products_update_product = (req, res) => {
  const authorizedKeys = ["name", "price", "isActive", "description"];
  return Controllers.tableUpdateOne("Produit", authorizedKeys, req, res);
};
