const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const { Movie } = require("./movieModel");

const Genre = sequelize.define(
  "Genre",
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
  },
  {
    timestamps: true,
  }
);

Movie.belongsToMany(Genre, { through: "MovieGenre" });
Genre.belongsToMany(Movie, { through: "MovieGenre" });

module.exports = { Genre };
