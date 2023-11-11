const { Actor } = require("../models/actorModel");
const { Movie } = require("../models/movieModel");

// CREATE ACTOR
const createActor = async (req, res) => {
  try {
    // Get actor details from the request body
    const { name, age, gender } = req.body;

    // Check if the actor already exists
    const actorExists = await Actor.findOne({
      where: { name },
    });
    if (actorExists) {
      return res.status(400).json({
        status: "error",
        message: "Actor already exists",
      });
    }

    // Create a new actor
    const actor = await Actor.create({
      name,
      age,
      gender,
    });

    if (actor) {
      res.status(201).json({
        status: "success",
        data: actor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// CREATE ACTOR-MOVIE ASSOCIATION
const createActorMovieAssociation = async (req, res) => {
  try {
    // Get actor and movie details from the request body
    const { actorName, movieName } = req.body;

    // Check if the actor exists
    const actor = await Actor.findOne({
      where: { name: actorName },
    });
    if (!actor) {
      return res.status(400).json({
        status: "error",
        message: "Actor does not exist",
      });
    }

    // Check if the movie exists
    const movie = await Movie.findOne({
      where: { name: movieName },
    });
    if (!movie) {
      return res.status(400).json({
        status: "error",
        message: "Movie does not exist",
      });
    }

    // Associate the actor with the movie
    await actor.addMovie(movie);
    res.status(200).json({
      status: "success",
      message: "Actor associated with movie successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// DELETE ACTOR IF NOT ASSOCIATED WITH ANY MOVIE
const deleteActor = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the actor exists
    const actor = await Actor.findOne({
      where: { name },
    });

    if (!actor) {
      return res.status(400).json({
        status: "error",
        message: "Actor does not exist",
      });
    }

    // Check if the actor is associated with any movies
    const movies = await actor.getMovies();
    if (movies.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Actor is associated with a movie",
      });
    }

    // Delete the actor
    await actor.destroy();
    res.status(200).json({
      status: "success",
      message: "Actor deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  createActor,
  createActorMovieAssociation,
  deleteActor,
};
