const express = require("express");

const router = express.Router();

const RolesController = require("../controllers/roles");

router.get("/", RolesController.roles_get_all);
router.get("/:id", RolesController.roles_get_role);
router.post("/", RolesController.roles_add_role);
router.put("/:id", RolesController.roles_update_role);
router.delete("/:id", RolesController.roles_delete_role);

module.exports = router;
