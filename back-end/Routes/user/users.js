const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../../models/User");
require("dotenv").config();
const UsersVerfication = require("../../models/UserVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment-timezone");
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
      sendVerificationEmail({ user, res });
      res.json({ success: true, token });
    }
  } catch (e) {
    res.status(401).json(e.errors);
  }
});
// Creating EndPoint For Registering the user //
const sendVerificationEmail = async ({ user }) => {
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
}; // TO DO

// Endpoint for verifying the user's email
router.get("/verify/:userId/:uniqueString", async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the verification record exists
    const verificationRecord = await UsersVerfication.findOne({
      userId: userId,
    });

    if (!verificationRecord) {
      return res
        .status(404)
        .json({ message: "Verification record not found." });
    }

    // Check if the verification link has expired
    if (verificationRecord.expiresAt < Date.now()) {
      return res.json({ message: "Verification link has expired." });
    }

    // Mark the user as verified
    await Users.updateOne({ _id: userId }, { isVerified: true });

    // Delete the verification record
    await UsersVerfication.deleteOne({ _id: verificationRecord._id });

    res.json("Email Verify !");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Creating EndPoint For User Login//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email }).exec();

    if (user) {
      if (!user.isVerified) {
        res.send(`${process.env.CLINT_SITE_URL}/${hash}/nan`);
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

// resent verify Email //
router.post("/resent", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  const currentUrl = `${process.env.CLINT_SITE_URL}/login`;
  const uniqueString = uuidv4() + user._id;
  const verificationLink = `${currentUrl}/verify/${user._id}/${uniqueString}`;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: req.body.email,
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
  res.json({ success: true });
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Verification email sent successfully.");
    }
  });
  // TO DO
});
// resent verify Email //

module.exports = router;
