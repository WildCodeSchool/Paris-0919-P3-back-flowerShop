const express = require("express");

const router = express.Router();
const ArticlesController = require("../controllers/articles");

router.get("/", ArticlesController.articles_get_all);

router.get("/:id", ArticlesController.articles_get_article);

router.post("/", ArticlesController.articles_add_article);

router.put("/:id", ArticlesController.articles_update_article);

router.delete("/:id", ArticlesController.articles_delete_article);

module.exports = router;
