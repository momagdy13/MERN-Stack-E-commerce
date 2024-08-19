const express = require("express");
const router = express.Router();
const fetchUser = require("../../Middleware/auth.js");
const Cart = require("../../models/Cart.js");
const doneOrder = require("../../models/DoneOrder.js");
const favSchema = require("../../models/FavList.js");

// add item to cart
router.post("/add", fetchUser, async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findById(cartId);

    if (!cart) {
      cart = new Cart({
        userId: req.user,
        details: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If item already exists in cart, increase quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If item doesn't exist in cart, add it
        cart.items.push({ productId, quantity });
      }
    }
    let Qnt = 0;
    for (const qunt of cart.items) {
      Qnt += qunt.quantity;
    }
    await cart.save();
    res
      .status(200)
      .json({ cartId: cart._id, quantity: Qnt, details: cart.items });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// add item to cart

// Remove item from cart
router.post("/delete", fetchUser, async (req, res) => {
  const { cartId, productId } = req.body;

  try {
    let cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      let Qnt = 0;
      for (const qunt of cart.items) {
        Qnt += qunt.quantity;
      }
      await cart.save();
      res
        .status(200)
        .json({ cartId: cart._id, quantity: Qnt, details: cart.items });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update item quantity in cart
router.post("/updatequantity", fetchUser, async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item if quantity is zero or less
        cart.items.splice(itemIndex, 1);
      } else {
        // Update item quantity
        cart.items[itemIndex].quantity = quantity;
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    let Qnt = 0;
    for (const qunt of cart.items) {
      Qnt += qunt.quantity;
    }
    await cart.save();
    res
      .status(200)
      .json({ cartId: cart._id, quantity: Qnt, details: cart.items });
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Creating EndPoint to get cart//

router.post("/getcart", fetchUser, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user });
  if (cart) {
    let Qnt = 0;
    for (const qunt of cart.items) {
      Qnt += qunt.quantity;
    }
    res.json({ cartId: cart._id, quantity: Qnt, details: cart.items });
  } else {
    res.status(403).json({ message: "There isnot any cart!" });
  }
});
// Creating EndPoint to get cart//
// Endpoint to create done orders
router.post("/doneorder", fetchUser, async (req, res) => {
  const { cart } = req.body;

  // Array to store all new orders
  const newOrders = [];

  try {
    for (const item of cart) {
      const newOrder = new doneOrder({
        product_id: item.productId,
        quantity: item.quantity,
        user_id: req.user,
      });
      await newOrder.save();
      newOrders.push(newOrder);
    }

    res.status(201).json(newOrders);
    return;
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create orders", error: error.message });
  }
});

// Endpoint to delete all items in the cart
router.post("/deleteall", fetchUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user });

    if (cart) {
      cart.items = [];
      await cart.save();
      return res.json({ success: 1 });
    } else {
      return res.status(404).json({ success: 0, message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: 0,
      message: "Failed to delete all items from the cart",
    });
  }
});

// Creating EndPoint to creat done order//

// Creating EndPoint to get done order//
router.get("/getdone", fetchUser, async (req, res) => {
  const user = await doneOrder.find({ user_id: req.user })
  res.json(user)
});
// Creating EndPoint to get done order//

// add to fav
router.post("/addfav", fetchUser, async (req, res) => {
  const { productId } = req.body;
  const check = await favSchema.findOne({ product_id: productId });

  if (!check) {
    const addFav = new favSchema({
      user_id: req.user,
      product_id: productId,
    });
    await addFav.save();
    res.json({ success: 1, text: "Your Product Added" });
  } else {
    res.send("This product already added");
  }
});
// add to fav

// add to fav
router.post("/removefav", fetchUser, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user; // Assuming req.user contains the user ID

  try {
    // Find the favorite entry by product_id and user_id
    const fav = await favSchema.findOneAndDelete({
      product_id: productId,
      user_id: userId,
    });

    if (fav) {
      // Successfully removed the favorite
      res.json({ success: 1, text: "Favorite removed successfully" });
    } else {
      // No favorite found to remove
      res.status(404).json({ success: 0, text: "Favorite not found" });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: 0, text: "Server error" });
  }
});
// add to fav

// favList
router.post("/favlist", fetchUser, async (req, res) => {
  const check = await favSchema.find({ user_id: req.user });
  if (check) {
    res.json(check);
  }
});

// favList

module.exports = router;
