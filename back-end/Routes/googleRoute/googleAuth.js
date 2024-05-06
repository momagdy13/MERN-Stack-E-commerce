const router = require("express").Router();
const passport = require("passport");
const Users = require("../../models/User");
const jwt = require("jsonwebtoken");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "googleauth/login/failed",
  }),
  async (req, res) => {
    const sub = req.user._json.sub;
    const email = req.user._json.email;
    const username = req.user._json.name;

    const existUser = await Users.findOne({ email: email }).exec();

    if (existUser) {
      const data = {
        user: existUser._id,
      };
      const token = jwt.sign(data, "seceret_ecom");
      res.redirect(`${process.env.CLINT_SITE_URL}/${token}`);
    } else {
      let cart = {};
      let Favourite = {};
      for (let index = 0; index < 300; index++) {
        cart[index] = 0;
        Favourite[index] = 0;
      }
      const user = new Users({
        username,
        email,
        password: sub,
        cartData: cart,
        favourite: Favourite,
      });

      await user.save();
      const data = {
        user: user._id,
      };
      const token = jwt.sign(data, "seceret_ecom");
      res.redirect(`${process.env.CLINT_SITE_URL}/${token}`);
    }
  }
);

module.exports = router;
