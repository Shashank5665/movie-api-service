const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const Movie = sequelize.define(
  "Movie",
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
    yearOfRelease: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    userRating: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    language: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Movie };
