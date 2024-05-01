const express = require("express");
const multer = require("multer");
const router = express.Router();

// image storage Engine //
const storage = multer.diskStorage({
  destination: "upload/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// image storage Engine //

// Creating Upload EndPoint For images //
router.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    sucsses: 1,
    img_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});
// Upload EndPoint\\

module.exports = router;
