const express = require("express");
const Product = require("../../models/Products");
const router = express.Router();

// Creating EndPoint For Add product//
router.post("/addproduct", async (req, res) => {
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
// Creating EndPoint For Add product//

// Creating EndPoint For delete product//
router.delete("/deleteproduct", async (req, res) => {
  await Product.findOneAndDelete(req.body.id, req.body.name);
  res.json({
    success: true,
    name: req.body.name,
  });
});
// Creating EndPoint For delete product//

// Creating EndPoint to get all_product//
router.get("/allproduct", async (req, res) => {
  let product = await Product.find({});
  res.json(product);
}); 
// Creating EndPoint to get all_product//

// Creating EndPoint to get new_product//
router.get("/newcollection", async (req, res) => {
  let product = await Product.find({});
  let newCollection = product.slice(1).slice(-4);
  console.log("newCollection");
  res.send(newCollection);
});
// Creating EndPoint For new_product//

// Creating EndPoint For Popular in Women//
router.get("/popular", async (req, res) => {
  let product = await Product.find({});
  let popular = product.slice(0, 4).slice(-4);
  res.send(popular);
});
// Creating EndPoint For Popular in Women//

// Creating EndPoint For Catg//
router.get("/:catg", async (req, res) => {
  let params = req.params.catg;
  let product = await Product.find({ category: params });
  res.json(product);
});
// Creating EndPoint For Catg//

module.exports = router;
