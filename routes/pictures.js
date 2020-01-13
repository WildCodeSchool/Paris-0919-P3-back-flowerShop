const express = require("express");

const router = express.Router();
const multer = require("multer");
const getConnection = require("../db");
const PicturesController = require("../controllers/pictures");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const acceptedFormat = ["image/jpeg", "image/jpg", "image/png"];
  if (acceptedFormat.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.get("/", PicturesController.pictures_get_all);

router.get("/:id", PicturesController.pictures_get_picture);

router.post("/", upload.single("img"), (req, res) => {
  const queryString = "INSERT INTO Photo(Url) VALUES(?)";
  getConnection.query(queryString, req.file.path, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to create item",
        error
      });
    }
    return res.status(201).json({
      id: results.insertId,
      message: "Item successfully added"
    });
  });
});

router.delete("/:id", PicturesController.pictures_delete_picture);

module.exports = router;
