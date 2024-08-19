const mongodb = require("mongoose");

const favSchema = new mongodb.Schema({
  product_id: { type: Object },
  user_id: { type: Object },
  Date: { type: Date, default: Date.now },
});
const favList = mongodb.model("favList", favSchema);

module.exports = favList
