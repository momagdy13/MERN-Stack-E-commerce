const express = require("express");
const router = express.Router();
const fetchUser = require("../../Middleware/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/////////////////////////// Handle Payment ///////////

router.post("/create-checkout-session", fetchUser, async (req, res) => {
  const item = req.body.items;

  if (Object.keys(item).length > 0) {
    const line_items = Array.isArray(item)
      ? item.map((item) => {
          return {
            price_data: {
              currency: "usd", 
              product_data: {
                name: item.name,
                description: item.descripe,
              },
              unit_amount: Math.round(item.price) * 100,
            },
            quantity: item.quant,
          };
        })
      : [];
    try {
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.CLINT_SITE_URL}/checkout-success`,
        cancel_url: `${process.env.CLINT_SITE_URL}/cart`,
      });

      res.send({ url: session.url });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("nan");
  }
});

/////////////////////////// Handle Payment ///////////
module.exports = router;
