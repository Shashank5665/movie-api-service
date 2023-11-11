const { Director } = require("../models/directorModel");
const { Movie } = require("../models/movieModel");

// Create a director and associate him with a movie
const createDirector = async (req, res) => {
  try {
    // Get director details from the request body
    const { name, age, gender } = req.body;

    // Check if the director already exists
    const directorExists = await Director.findOne({
      where: { name },
    });
    if (directorExists) {
      return res.status(400).json({
        status: "error",
        message: "Director already exists",
      });
    }

    // Create a new director
    const director = await Director.create({
      name,
      age,
      gender,
    });

    if (director) {
      res.status(201).json({
        status: "success",
        data: director,
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

// CREATE DIRECTOR-MOVIE ASSOCIATION
const createDirectorMovieAssociation = async (req, res) => {
  try {
    // Get director and movie details from the request body
    const { directorName, movieName } = req.body;

    // Check if the director exists
    const director = await Director.findOne({
      where: { name: directorName },
    });
    if (!director) {
      return res.status(400).json({
        status: "error",
        message: "Director does not exist",
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

    // Associate the director with the movie
    await director.addMovie(movie);

    res.status(201).json({
      status: "success",
      message: `${directorName} is now associated with ${movieName}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { createDirector, createDirectorMovieAssociation };
