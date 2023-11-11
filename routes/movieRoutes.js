const express = require("express");
let router = express.Router();
const {
  createMovie,
  updateMovie,
  getAllMovies,
  getMovieByName,
} = require("../controllers/movieController");

router.post("/", createMovie);
router.patch("/", updateMovie);
router.get("/", getAllMovies);
router.get("/:name", getMovieByName);

module.exports = router;
