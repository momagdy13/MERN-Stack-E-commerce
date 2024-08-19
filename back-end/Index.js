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
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../upload/images");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use("/images", express.static(uploadDir));

// Endpoint to upload an image
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  console.log("Image URL:", imageUrl);

  res.json({
    success: 1,
    img_url: imageUrl,
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", " https://moshop24.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: " https://moshop24.netlify.app",
  })
);

// function corsMiddleware(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Accept, authorization, Authorization, Content-Type, auth-token"
//   );

//   next();
// }
// app.use(corsMiddleware);
// app.use(
//   cors({
//     origin: "https://moshop24.netlify.app",
//   })
// );

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
