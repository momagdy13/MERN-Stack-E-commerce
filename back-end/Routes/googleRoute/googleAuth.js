const router = require("express").Router();
const passport = require("passport");
const Users = require("../../models/User");
const jwt = require("jsonwebtoken");
const UsersVerfication = require("../../models/UserVerification");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment-timezone");
const Cart = require("../../models/Cart");
const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
    0x67, 0x1c, 0x58, 0x36,
  ],
};
const hash = uuidv4(v4options);
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
      const token = jwt.sign(
        { data },
        process.env.JWT_SECRET || "default_secret"
      );
      const cart = new Cart({ userId: user._id, details: [] });
      await cart.save();
      res.redirect(`${process.env.CLINT_SITE_URL}/${token}`);
    } else {
      const user = new Users({
        username,
        email,
        password: sub,
      });

      const cart = new Cart({ userId: user._id, details: [] });

      await user.save();
      await cart.save();
      const data = {
        user: user._id,
      };
      const token = jwt.sign(
        { data },
        process.env.JWT_SECRET || "default_secret"
      );
      await sendVerificationEmail({ user, res });
      res.redirect(`${process.env.CLINT_SITE_URL}/${token}`);
    }
  }
);

// Creating EndPoint For Registering the user //
const sendVerificationEmail = async ({ user, res }) => {
  const currentUrl = `${process.env.CLINT_SITE_URL}/login`;
  const uniqueString = uuidv4() + user._id;
  const verificationLink = `${currentUrl}/verify/${user._id}/${uniqueString}`;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Verify Your Email",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
            text-align: center;
          }
          p {
            color: #666666;
            line-height: 1.6;
          }
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Verify your email address</h1>
          <p>Click the button below to verify your email address and complete your account registration:</p>
          <a class="cta-button" href="${verificationLink}">Verify Email</a>
          <p><strong>Note:</strong> This link will expire in 50 minutes.</p>
        </div>
      </body>
      </html>
    `,
  };

  const newVerification = new UsersVerfication({
    userId: user._id,
    uniqueString,
    createdAt: Date.now(),
    expiresAt: moment().add(50, "minutes").valueOf(),
  });

  await newVerification.save();

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Verification email sent successfully.");
    }
  });
};

module.exports = router;
