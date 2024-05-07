const express = require("express");
const Users = require("../../models/User.js");
const router = express.Router();

const fetchUser = require("../../Middleware/auth.js");

// Creating EndPoint For Add to cart//
router.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const { itemId } = req.body;
    const updatedCartData = {
      ...user.cartData,
      [itemId]: (user.cartData[itemId] || 0) + 1,
    };

    await Users.findByIdAndUpdate(req.user, { cartData: updatedCartData });

    res.send("Added");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Creating EndPoint For Add to cart//

// Creating EndPoint For delet from cart//

router.post("/deletefromcart", fetchUser, async (req, res) => {
  try {
    const user = await Users.findById(req.user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const { itemId } = req.body;
    const currentQuantity = user.cartData[itemId] || 0;

    if (currentQuantity > 0) {
      const updatedCartData = {
        ...user.cartData,
        [itemId]: currentQuantity - 1,
      };
      await Users.findByIdAndUpdate(req.user, { cartData: updatedCartData });
      res.send("Deleted");
    } else {
      res.status(400).send("Item not found in cart");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
