const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const { Movie } = require("./movieModel");

const Technician = sequelize.define(
  "Technician",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Movie.belongsToMany(Technician, { through: "MovieTechnician" });
Technician.belongsToMany(Movie, { through: "MovieTechnician" });

module.exports = { Technician };
