const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:produitId", (req, res) => {});

router.post("/", (req, res) => {});

router.patch("/:produitId", (req, res) => {});

router.delete("/:produitId", (req, res) => {});

module.exports = router;
