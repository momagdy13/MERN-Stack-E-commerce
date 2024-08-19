const mongodb = require('mongoose')
const orderSchema = new mongodb.Schema({
  product_id: { type: Object },
  quantity: { type: Number },
  user_id: { type: Object },
  Date: { type: Date, default: Date.now },
});
const doneOrder = mongodb.model("doneorder", orderSchema);

module.exports = doneOrder;
