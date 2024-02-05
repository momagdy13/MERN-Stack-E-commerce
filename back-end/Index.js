const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Product = require("./models/Products.js");
app.use(express.json());
app.use(cors());

// mongoose user = {hamomagdy12266} pass = {pY0EyZ2ow0yPeDIw}

mongoose
  .connect(
    `mongodb+srv://hamomagdy12266:pY0EyZ2ow0yPeDIw@productculster.pym2sey.mongodb.net/`
  )
  .then(() => {
    console.log("Success Connect");
  })
  .catch((error) => {
    console.log(`error:`, error);
  });


  app.get("/", (req, res) => {
    res.send("Express app is running");
  });

  // image storage Engine

  const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const upload = multer({ storage: storage });

  // Creating Upload EndPoint For images
  app.use("/images", express.static("upload/images"));
  app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
      sucsses: 1,
      img_url: `http://localhost:4000/images/${req.file.filename}`,
    });
  });

  // Upload EndPoint\\

  app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let Id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      Id = last_product.id + 1;
    } else {
      Id = 1;
    }
    const product = new Product();
    product.id = Id;
    product.name = req.body.name;
    product.descripe = req.body.descripe;
    product.image = req.body.image;
    product.category = req.body.category;
    product.rate = req.body.rate;
    product.price = req.body.price;
    await product.save();

    res.json(product);
  });
  app.delete("/deleteproduct", async (req, res) => {
    await Product.findOneAndDelete(req.body.id, req.body.name);
    res.json({
      success: true,
      name: req.body.name,
    });
  });
  app.get("/allproduct", async (req, res) => {
    let product = await Product.find({});
    res.json(product);
  });
 







  app.listen(port, () => {
    console.log("I'm Listen to 4000");
  });

