const express = require("express");
const router = express.Router();
const user = require("../Routes/user/users.js");
const cart = require("../Routes/cart/cart.js");
const fav = require("../Routes/fav/fav.js");
const stripe = require("../Routes/payment/payment.js");
const product = require("../Routes/Products/product.js");
const gauth = require("../Routes/googleRoute/googleAuth.js");
router.use("/product", product);
router.use("/auth", user);
router.use("/cart", cart);
router.use("/fav", fav);
router.use("/stripe", stripe);
router.use("/googleauth", gauth);

 
module.exports = router;
 