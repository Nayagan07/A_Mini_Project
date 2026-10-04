const express = require("express");
const router = express.Router();

const {
    uploadAnimalImage
} = require("../controllers/emergencyController");

router.post("/upload", uploadAnimalImage);

module.exports = router;