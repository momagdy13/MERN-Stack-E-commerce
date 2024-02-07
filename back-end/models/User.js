const mongoose = require("mongoose");

const Users = mongoose.Schema({
  username: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
  },
  password: { type: String, required: true },
  cartData: { type: Object, ref: "product" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", Users);
