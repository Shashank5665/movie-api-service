const express = require("express");
let router = express.Router();
const {
  createGenre,
  createGenreMovieAssociation,
} = require("../controllers/genreController");

router.post("/", createGenre);
router.post("/association", createGenreMovieAssociation);

module.exports = router;
