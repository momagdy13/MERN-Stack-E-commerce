const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../../models/User");
require("dotenv").config();
const UsersVerfication = require("../../models/UserVerification");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment-timezone");
const fetchUser = require("../../Middleware/auth");
const Cart = require("../../models/Cart");

// Creating EndPoint For Registering the user //
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const user = new Users({ username, email, password });

    // Create an empty cart for the user
    const cart = new Cart({ userId: user._id, details: [] });

    // Save user and cart to the database
    await user.save();
    await cart.save();

    // Generate a token
    const token = jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET || "default_secret"
    );

    // Send verification email
    sendVerificationEmail({ user, res });

    // Respond with success
    res.json({ success: true, token });
  } catch (e) {
    console.error("Error during signup:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Creating EndPoint For Registering the user //

// Creating EndPoint For User Login//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Users.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    if (password === user.password) {
      const data = { user: user._id };
      const token = jwt.sign(data, process.env.JWT_SECRET || "default_secret");
      res.json({ success: true, token });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ message: "Internal server error." });
  }
});
// Creating EndPoint For User Login//

router.post("/getaccount", fetchUser, async (req, res) => {
  const check = await Users.findById({ _id: req.user });
  if (check) {
    res.json(check);
  }
});

// Update User Data
router.put("/update", fetchUser, async (req, res) => {
  try {
    const userId = req.user;
    const { username, email, password } = req.body;

    if (password.length >= 6) {
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { username, email, password },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ success: true, user: updatedUser });
    } else {
      res.json({ message: "Password must be at least 6 charcaters" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update User Data

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
};

// Endpoint for verifying the user's email
router.get("/verify/:userId/:uniqueString", async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the verification record exists
    const verificationRecord = await UsersVerfication.findOne({
      userId: userId,
    });

    if (!verificationRecord) {
      return res.json("Verification record not found.");
    }

    // Check if the verification link has expired
    if (verificationRecord.expiresAt < Date.now()) {
      return res.json("Verification link has expired.");
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

// resent verify Email //
router.post("/resent", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (user) {
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
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + 5 * 60000);

    const newVerification = new UsersVerfication({
      userId: user._id,
      uniqueString,
      createdAt: Date.now(),
      expiresAt: expiresAt,
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
  } else {
    res.json("This Email Is not Exist !");
  }

  // TO DO
});
// resent verify Email //

module.exports = router;
