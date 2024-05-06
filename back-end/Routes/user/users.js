const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../../models/User");
const app = express();
require("dotenv").config();
const UsersVerfication = require("../../models/UserVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment-timezone");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Ready for Message");
    console.log(success);
  }
});

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mern-stack-e-commerce-1.onrender.com"
  );
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
    } else if (password.length < 8) {
      return res.status(401).json({
        name: "ValidatorError",
        message: "Pass Too Short  It Should be 8 Characters At Least !",
        properties: {
          message: "Pass Too Short  It Should be 8 Characters At Least !",
          type: "passErr",
          path: "password",
          value: `${password}`,
        },
        kind: "passErr",
        path: "password",
        value: `${password}`,
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
      await sendVerificationEmail({ user, token, res });

      res.json({ success: true, token });
    }
  } catch (e) {
    res.status(401).json(e.errors);
  }
});
// Creating EndPoint For Registering the user //

const sendVerificationEmail = async ({ user, token, res }) => {
  const currentUrl = `${process.env.CLINT_SITE_URL}/login`;
  const uniqueString = uuidv4() + user._id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete signup and login into your account.</p><p> This Link <b> Expire in 5 minutes </b> . </p> <p> Press <a href = ${
      currentUrl + "/verify" + "/" + token + "/" + user._id + "/" + uniqueString
    }>here</a> To proceed. </p>`,
  };

  const newVerification = new UsersVerfication({
    userId: user._id,
    uniqueString,
    createdAt: Date.now(),
    expiresAt: moment().add(5, "minutes").valueOf(),
  });

  await newVerification
    .save()
    .then(() => {
      transporter
        .sendMail(mailOptions)

        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

router.get("/verify/:token/:userId/:uniqueString", async (req, res) => {
  const { token, userId } = req.params;
  const user = await Users.findOne({ _id: userId }).exec();
  if (user) {
    jwt.verify(token, "seceret_ecom");

    await Users.updateOne({ _id: userId }, { verified: true });
    res.json("Email verified.");
  } else {
    console.log(err);

    res.json("Email verification failed.");
  }
});
// Creating EndPoint For User Login//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email }).exec();

    if (user) {
      if (!user.verified) {
        res.json("Email has not verified. please check your inbox");
      } else {
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
