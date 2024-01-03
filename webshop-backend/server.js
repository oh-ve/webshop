const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const discountRoutes = require("./routes/discountRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./dbinit");

connectDB();

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  res.header("Accept", "application/json");
  next();
});

app.get("/", (req, res) => {
  res.send("Webshop API");
});

app.use("/discount", discountRoutes);

app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
