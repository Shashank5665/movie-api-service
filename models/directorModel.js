const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const { Movie } = require("./movieModel");

const Director = sequelize.define(
  "Director",
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
    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Movie.belongsToMany(Director, { through: "MovieDirector" });
Director.belongsToMany(Movie, { through: "MovieDirector" });

module.exports = { Director };
