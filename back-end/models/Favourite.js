const mongodb = require("mongoose");

const favSchema = new mongodb.Schema({
  productId: { type: Object, ref: "product" },
  userId: { type: Object },
});

const fav = ("favList", favSchema);

module.exports = favSchema;
