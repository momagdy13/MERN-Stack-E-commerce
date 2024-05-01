const express = require("express");
const Users = require("../../models/User.js");
const router = express.Router();
const fetchUser = require("../../Middleware/auth");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/////////////////////////// Handle Payment ///////////

router.post("/create-checkout-session", fetchUser, async (req, res) => {
  const item = await req.body.items;
  const line_items = Array.isArray(item)
    ? item.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.image],
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
});

/////////////////////////// Handle Payment ///////////
module.exports = router;
