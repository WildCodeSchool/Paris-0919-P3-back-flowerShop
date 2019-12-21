const getConnection = require("../db");
const { setKeysValuesToString } = require("../utils/");

exports.products_get_all = (req, res) => {
  const queryString = "SELECT * FROM Produit";
  getConnection.query(queryString, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to get products",
        error
      });
    }
    res.status(200).json(results);
  });
};

exports.products_get_product = (req, res) => {
  const { productId } = req.params;
  const queryString = "SELECT * FROM Produit WHERE id= (?)";
  getConnection.query(queryString, [productId], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: `Product with id=${productId} does not exists`,
        error
      });
    }
    res.status(200).json(result);
  });
};

exports.products_create_product = (req, res) => {
  const { name, price, isActive, description } = req.body;

  const queryString =
    "INSERT INTO Produit(name, price, isActive, description) VALUES (?, ?, ? ,?)";

  getConnection.query(
    queryString,
    [name, price, isActive, description],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to create product",
          error
        });
      }
      res.status(201).json({
        id: results.insertId,
        product: {
          name,
          price,
          isActive,
          description
        }
      });
    }
  );
};

exports.products_update_product = (req, res) => {
  const { productId } = req.params;
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);
  const authorizedKeys = ["name", "price", "isActive", "description"];
  const isAuthorized = bodyKeys.every(key => authorizedKeys.includes(key));

  const setValues = setKeysValuesToString(bodyKeys, bodyValues);

  const queryString = `UPDATE Produit SET ${setValues} WHERE id=(?)`;

  if (isAuthorized) {
    getConnection.query(queryString, [productId], (error, result) => {
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
