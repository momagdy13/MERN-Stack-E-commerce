const express = require("express");
const Users = require("../../models/User.js");
const router = express.Router();

const fetchUser = require("../../Middleware/auth.js");

// Creating EndPoint For Add to cart//
router.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user },
    { cartData: userData.cartData }
  );
  res.send("Added");
});
// Creating EndPoint For Add to cart//

// Creating EndPoint For delet from cart//

router.post("/deletefromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });

  if ((await userData.cartData[req.body.itemId]) > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user },
      { cartData: userData.cartData }
    );
    res.send("Deleted");
  } else {
    res.json("err cart is empty");
  }
});
router.delete("/deleteallfromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  await Users.findOneAndUpdate({ _id: req.user }, { cartData: cart });
  res.send("Deleted");
});
// Creating EndPoint For delet from cart//

// Creating EndPoint to get cart//

router.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  res.json(userData.cartData);
});
// Creating EndPoint to get cart//

router.post("/getaccount", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  res.json(userData);
});

// Creating EndPoint to creat done order//
router.post("/addtodone", fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user });
  if (user) {
    await Users.updateOne({ _id: req.user }, { $push: { doneOrder: 1 } });
  }
  res.json({ success: 1 });
});
// Creating EndPoint to creat done order//

// Creating EndPoint to get done order//
router.post("/getdone", fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user });
  res.json(user.doneOrder.length);
});
// Creating EndPoint to get done order//

module.exports = router;
