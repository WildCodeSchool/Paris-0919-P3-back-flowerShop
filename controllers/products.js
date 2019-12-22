const getConnection = require("../db");
const { setKeysValuesToString } = require("../utils/helpers");
const Controllers = require("../utils/controllers");

exports.products_get_all = (req, res) => {
  return Controllers.tableGetAll("Produit", res);
};

exports.products_get_product = (req, res) => {
  return Controllers.tableGetOne("Produit", req, res);
};

exports.products_create_product = (req, res) => {
  return Controllers.tableCreateOne("Produit", req, res);
};

exports.products_update_product = (req, res) => {
  const { id } = req.params;
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);
  const authorizedKeys = ["name", "price", "isActive", "description"];
  const isAuthorized = bodyKeys.every(key => authorizedKeys.includes(key));

  const setValues = setKeysValuesToString(bodyKeys, bodyValues);

  const queryString = `UPDATE Produit SET ${setValues} WHERE id=(?)`;

  if (isAuthorized) {
    getConnection.query(queryString, [id], (error, result) => {
      const productNotExists = result.affectedRows === 0;
      if (error || productNotExists) {
        return res.status(500).json({
          message: "Failed to update product",
          queryString,
          error
        });
      }
      res.status(200).json({
        message: "Successfully updated product",
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
