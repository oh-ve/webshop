const express = require("express");
const app = express.Router();

const {
  deleteAllDiscounts,
  getAllDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  validateDiscount,
} = require("../controllers/discountControllers");

app
  .route("/")
  .post(createDiscount)
  .get(getAllDiscounts)
  .delete(deleteAllDiscounts);
app.route("/:code").get(getDiscount).put(updateDiscount).delete(deleteDiscount);

module.exports = app;
