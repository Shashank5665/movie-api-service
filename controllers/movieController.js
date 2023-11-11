const { Movie } = require("../models/movieModel.js");
const { Actor } = require("../models/actorModel.js");
const { Director } = require("../models/directorModel.js");
const { Technician } = require("../models/technicianModel.js");

// CREATE A MOVIE
const createMovie = async (req, res) => {
  try {
    //getting data from the body of the request
    const { name, yearOfRelease, userRating, duration, language, country } =
      req.body;

    //checking if the movie already exists
    const movieExists = await Movie.findOne({ where: { name } });
    if (movieExists) {
      return res.status(400).json({
        status: "fail",
        message: "Movie already exists",
      });
    }

    //creating a new movie
    await sequelize.transaction(async function (transaction) {
      const movie = await Movie.create(
        {
          name,
          yearOfRelease,
          userRating,
          duration,
          language,
          country,
        },
        { transaction }
      );

      //sending the response if the movie is created successfully
      res.status(201).json({
        status: "success",
        data: movie,
      });
    });
  } catch (err) {
    //sending the error response if the movie is not created
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE A MOVIE
const updateMovie = async (req, res) => {
  try {
    //getting data from the body of the request
    const { name, yearOfRelease, userRating, duration, language, country } =
      req.body;

    //checking if the movie exists
    const movie = await movieModel.findOne({ where: { name } });
    if (!movie) {
      return res.status(400).json({
        status: "fail",
        message: "Movie does not exist",
      });
    }

    //updating the movie
    await sequelize.transaction(async function (transaction) {
      await movieModel.update(
        {
          yearOfRelease,
          userRating,
          duration,
          language,
          country,
        },
        { where: { name }, transaction }
      );

      //sending the response if the movie is updated successfully
      res.status(200).json({
        status: "success",
        message: "Movie updated successfully",
      });
    });
  } catch (err) {
    //sending the error response if the movie is not updated
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//GET ALL MOVIES WITH FILTERS
const getAllMovies = async (req, res) => {
  try {
    // Getting data from the query string
    const { actorName, directorName, technicianName } = req.query;

    // Finding actors, directors, and technicians
    const actor = actorName
      ? await Actor.findOne({ where: { name: actorName } })
      : null;

    const director = directorName
      ? await Director.findOne({ where: { name: directorName } })
      : null;

    const technician = technicianName
      ? await Technician.findOne({ where: { name: technicianName } })
      : null;

    // Creating an array of includes
    const includeArray = [];

    if (actor) {
      includeArray.push({
        model: Actor,
        where: { id: actor.id },
        attributes: ["id", "name"],
        through: { attributes: [] },
      });
    }

    if (director) {
      includeArray.push({
        model: Director,
        where: { id: director.id },
        attributes: ["id", "name"],
        through: { attributes: [] },
      });
    }

    if (technician) {
      includeArray.push({
        model: Technician,
        where: { id: technician.id },
        attributes: ["id", "name"],
        through: { attributes: [] },
      });
    }

    // Fetching movies with associations
    const movies = await Movie.findAll({
      include: includeArray,
      attributes: ["id", "name", "yearOfRelease", "userRating", "duration"],
      limit: 10,
    });

    // Sending the response if the movies are fetched successfully
    res.status(200).json({
      status: "success",
      data: movies,
    });
  } catch (err) {
    // Sending the error response if the movies are not fetched
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET A MOVIE BY NAME
const getMovieByName = async (req, res) => {
  try {
    //getting data from the query string
    const { name } = req.params;

    //checking if the movie exists
    const movie = await Movie.findOne({ where: { name } });

    if (!movie) {
      return res.status(400).json({
        status: "fail",
        message: "Movie does not exist",
      });
    }

    //sending the response if the movie is fetched successfully
    res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (err) {
    //sending the error response if the movie is not fetched
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { createMovie, updateMovie, getAllMovies, getMovieByName };
