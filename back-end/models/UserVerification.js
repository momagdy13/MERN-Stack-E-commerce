const mongoose = require("mongoose");
const UsersVer = mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserVerFunction = mongoose.model("usersverficate", UsersVer);
module.exports = UserVerFunction;
