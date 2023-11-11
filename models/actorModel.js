const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const { Movie } = require("./movieModel");

const Actor = sequelize.define(
  "Actor",
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

Movie.belongsToMany(Actor, { through: "MovieActor" });
Actor.belongsToMany(Movie, { through: "MovieActor" });

module.exports = { Actor };
