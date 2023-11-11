const { Genre } = require("../models/genreModel");
const { Movie } = require("../models/movieModel");

// CREATE GENRE
const createGenre = async (req, res) => {
  try {
    // Get genre details from the request body
    const { name } = req.body;

    // Check if the genre already exists
    const genreExists = await Genre.findOne({
      where: { name },
    });
    if (genreExists) {
      return res.status(400).json({
        status: "error",
        message: "Genre already exists",
      });
    }

    // Create a new genre
    const genre = await Genre.create({
      name,
    });

    if (genre) {
      res.status(201).json({
        status: "success",
        data: genre,
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

// CREATE GENRE-MOVIE ASSOCIATION
const createGenreMovieAssociation = async (req, res) => {
  try {
    // Get genre and movie details from the request body
    const { genreName, movieName } = req.body;

    // Check if the genre exists
    const genre = await Genre.findOne({
      where: { name: genreName },
    });
    if (!genre) {
      return res.status(400).json({
        status: "error",
        message: "Genre does not exist",
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

    // Create a new genre-movie association
    await genre.addMovie(movie);

    res.status(201).json({
      status: "success",
      message: "Genre-movie association created successfully",
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
  createGenre,
  createGenreMovieAssociation,
};
