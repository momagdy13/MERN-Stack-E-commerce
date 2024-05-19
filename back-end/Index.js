require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportStrategy = require("./googlAuth/passport");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = require("./Controll/Controll");
require("./Config/dbConnect");

app.use(
  cors({
    origin: "https://moshop24.netlify.app",
  })
);
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
app.use("/", router);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
