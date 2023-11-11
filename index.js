const express = require("express");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");
const directorRoutes = require("./routes/directorRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const genreRoutes = require("./routes/genreRoutes");

const app = express();
const PORT = 5000;
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/movies", movieRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/genres", genreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
