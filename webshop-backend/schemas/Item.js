const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Boolean },
  limited: { type: Boolean },
  img: { type: String },
  amount: { type: String },
  description: { type: String },
});

module.exports = Item = mongoose.model("item", itemSchema);
