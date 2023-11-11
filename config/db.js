let Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     dialect: process.env.DATABASE_DIALECT,
//     port: process.env.DATABASE_PORT,
//   }
// );

const sequelize = new Sequelize("movie", "postgres", "root", {
  dialect: "postgres",
  port: 5432,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connectDB();

global.sequelize = sequelize;
module.exports = sequelize;
