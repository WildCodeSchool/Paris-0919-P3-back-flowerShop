const express = require("express");
const router = express.Router();

const SizesController = require("../controllers/sizes");

router.get("/", SizesController.sizes_get_all);
router.get("/:id", SizesController.sizes_get_size);
router.post("/", SizesController.sizes_add_size);
router.put("/:id", SizesController.sizes_update_size);
router.delete("/:id", SizesController.sizes_delete_size);

module.exports = router;
