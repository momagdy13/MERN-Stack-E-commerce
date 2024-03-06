const mongoose = require("mongoose");
const Product = mongoose.model("product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  descripe: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rate: { type: Number, required: true },
  price: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

module.exports = Product;
