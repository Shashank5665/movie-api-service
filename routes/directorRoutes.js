const express = require("express");
let router = express.Router();
const {
  createDirector,
  createDirectorMovieAssociation,
} = require("../controllers/directorController");

router.post("/", createDirector);
router.post("/association", createDirectorMovieAssociation);

module.exports = router;
