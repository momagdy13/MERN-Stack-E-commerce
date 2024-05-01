const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../../models/User");
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Creating EndPoint For Registering the user //
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await Users.findOne({ email }).exec();
    if (user) {
      return res.status(401).json({
        name: "ValidatorError",
        message: "Mail Is Exist!",
        properties: {
          message: "Mail Is Exist!",
          type: "Dublicate",
          path: "email",
          value: `${email}`,
        },
        kind: "Dublicate",
        path: "email",
        value: `${email}`,
      });
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
        password,
        cartData: cart,
        favourite: Favourite,
      });
      await user.save();
      const data = {
        user: user._id,
      };
      const token = jwt.sign(data, "seceret_ecom");
      res.json({ success: true, token });
    }
  } catch (e) {
    res.status(401).json(e.errors);
  }
});
// Creating EndPoint For Registering the user //

// Creating EndPoint For User Login//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      if (password == user.password) {
        const data = {
          user: user._id,
        };
        const token = jwt.sign(data, "seceret_ecom");
        res.json({ success: true, token });
      } else {
        res.status(401).json({
          name: "ValidatorError",
          message: "Wrong password!",
          properties: {
            message: "Wrong password!",
            type: "Wrong",
            path: "password",
            value: `passwordd`,
          },
          kind: "wrong",
          path: "password",
          value: `password`,
        });
      }
    } else {
      res.status(401).json({
        name: "ValidatorError",
        message: "This Email Isn't Exist",
        properties: {
          message: "This Email Isn't Exist",
          type: "Wrong",
          path: "email",
          value: `${email}`,
        },
        kind: "Wrong",
        path: "email",
        value: `${email}`,
      });
    }
  } catch (e) {
    res.status(401).json(e.errors);
  }
});
// Creating EndPoint For User Login//

module.exports = router;
