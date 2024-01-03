const express = require("express");
const app = express.Router();

const {
  deleteAllItems,
  getAllItems,
  getOneItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemControllers");

app.route("/").post(createItem).get(getAllItems).delete(deleteAllItems);
app.route("/:id").get(getOneItem).delete(deleteItem).put(updateItem);

module.exports = app;
