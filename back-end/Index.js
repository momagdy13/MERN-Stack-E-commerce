require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./googlAuth/passport");
const router = require("./Controll/Controll");
require("./Config/dbConnect");
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Your route logic
  res.send("Hello, world!");
});
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["mo2468"],
  })
);

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

const port = 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
