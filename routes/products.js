const express = require("express");
const ProductsController = require("../controllers/products");

const router = express.Router();

router.get("/", ProductsController.products_get_all);

router.get("/:productId", ProductsController.products_get_product);

router.post("/", ProductsController.products_create_product);

router.put("/:productId", ProductsController.products_update_product);

module.exports = router;
