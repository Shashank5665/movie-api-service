const express = require("express");
let router = express.Router();
const {
  createTechnician,
  createTechnicianMovieAssociation,
} = require("../controllers/technicianController");

router.post("/", createTechnician);
router.post("/association", createTechnicianMovieAssociation);

module.exports = router;
