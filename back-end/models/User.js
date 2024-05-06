const mongoose = require("mongoose");
const Users = mongoose.Schema({
  username: { type: String, required: [true, "UserName Is Required!"] },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    unique: [true, "Email Should Be Unique!"],
    match:
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
  },
  password: { type: String, required: [true, "Pass Is Required!"] },
  cartData: { type: Object, ref: "product" },
  favourite: { type: Object, ref: "product" },
  doneOrder: { type: Array, ref: "product" },
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", Users);
