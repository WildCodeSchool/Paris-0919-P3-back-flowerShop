const express = require("express");

const router = express.Router();
const UsersController = require("../controllers/users");

router.get("/", UsersController.users_get_all);

router.get("/", UsersController.users_get_user);

router.post("/", UsersController.users_add_user);

router.post("/", UsersController.users_update_user);

router.post("/", UsersController.users_delete_user);

module.exports = router;
