const express = require("express");
const router = express.Router();
const fetchUser = require("../../Middleware/auth");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const Product = require("../../models/Products");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
    0x67, 0x1c, 0x58, 0x36,
  ],
};

const hash = uuidv4(v4options);

/////////////////////////// Handle Payment ///////////

router.post("/create-checkout-session", fetchUser, async (req, res) => {
  const item = req.body.items;

  if (!item) {
    console.log("Item data is not available");
    return;
  }

  const line_items = item.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: item.product.descripe,
        },

        unit_amount: Math.round(item.product.price) * 100,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment", 
      success_url: `${process.env.CLINT_SITE_URL}success`,  
      cancel_url: `${process.env.CLINT_SITE_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
  }
});

/////////////////////////// Handle Payment ///////////
module.exports = router;
