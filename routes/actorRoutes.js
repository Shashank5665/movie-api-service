const express = require("express");
let router = express.Router();
const {
  createActor,
  deleteActor,
  createActorMovieAssociation,
} = require("../controllers/actorController");

router.post("/", createActor);
router.post("/association", createActorMovieAssociation);
router.delete("/", deleteActor);

module.exports = router;
