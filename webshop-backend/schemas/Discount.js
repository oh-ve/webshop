const mongoose = require("mongoose");

const { Schema } = mongoose;

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  expirationDate: { type: Date, required: true },
  discountValue: { type: Number, required: true },
  used: { type: Boolean, default: false },
});

module.exports = Discount = mongoose.model("discount", discountSchema);
