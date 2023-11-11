const { Technician } = require("../models/technicianModel");
const { Movie } = require("../models/movieModel");

// CREATE TECHNICIAN
const createTechnician = async (req, res) => {
  const { name, role } = req.body;
  try {
    // Check if the technician already exists
    const technicianExists = await Technician.findOne({
      where: { name },
    });
    if (technicianExists) {
      return res.status(400).json({
        status: "error",
        message: "Technician already exists",
      });
    }

    // Create a new technician
    const technician = await Technician.create({
      name,
      role,
    });

    if (technician) {
      res.status(201).json({
        status: "success",
        data: technician,
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

// CREATE TECHNICIAN-MOVIE ASSOCIATION
const createTechnicianMovieAssociation = async (req, res) => {
  try {
    // Get technician and movie details from the request body
    const { technicianName, movieName } = req.body;

    // Check if the technician exists
    const technician = await Technician.findOne({
      where: { name: technicianName },
    });
    if (!technician) {
      return res.status(400).json({
        status: "error",
        message: "Technician does not exist",
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

    // Associate the technician with the movie
    await technician.addMovie(movie);

    res.status(201).json({
      status: "success",
      message: "Technician-Movie association created successfully",
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
  createTechnician,
  createTechnicianMovieAssociation,
};
