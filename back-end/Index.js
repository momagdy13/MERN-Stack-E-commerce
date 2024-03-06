const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Product = require("./models/Products.js");
const Users = require("./models/User.js");
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// mongoose user = {hamomagdy12266} pass = {pY0EyZ2ow0yPeDIw}
mongoose
  .connect(
    `mongodb+srv://hamomagdy12266:pY0EyZ2ow0yPeDIw@productculster.pym2sey.mongodb.net/?retryWrites=true&w=majority`
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
// Creating EndPoint For Add product//

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
// Creating EndPoint For Add product//

// Creating EndPoint For delete product//
app.delete("/deleteproduct", async (req, res) => {
  await Product.findOneAndDelete(req.body.id, req.body.name);
  res.json({
    success: true,
    name: req.body.name,
  });
});
// Creating EndPoint For delete product//
// Creating EndPoint to get all_product//
app.get("/allproduct", async (req, res) => {
  let product = await Product.find({});
  res.json(product);
});
// Creating EndPoint to get all_product//
// Creating EndPoint For Catg//

app.get("/:catg", async (req, res) => {
  let params = req.params.catg;

  let product = await Product.find({ category: params });
  res.json(product);
});
// Creating EndPoint For Catg//

// Creating EndPoint For Registering the user //
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await Users.findOne({ email }).exec();
    if (user) {
      return res.json({
        email: {
          name: "ValidatorError",
          message: "Mail Is Exist!",
          properties: {
            message: "Mail Is Exist!",
            type: "Dublicate",
            path: "email",
            value: `${email}`,
          },
          kind: "Dublicate",
          path: "email",
          value: `${email}`,
        },
      });
    } else {
      let cart = {};
      let Favourite = {};
      for (let index = 0; index < 300; index++) {
        cart[index] = 0;
        Favourite[index] = 0;
      }
      const user = new Users({
        username,
        email,
        password,
        cartData: cart,
        favourite: Favourite,
      });
      await user.save();
      const data = {
        user: user._id,
      };
      const token = jwt.sign(data, "seceret_ecom");
      res.json({ success: true, token });
    }
  } catch (e) {
    res.json(e.errors);
  }
});
// Creating EndPoint For Registering the user //
// Creating EndPoint For User Login//
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });
    if (user) {
      if (password == user.password) {
        const data = {
          user: user._id,
        };
        const token = jwt.sign(data, "seceret_ecom");
        res.json({ success: true, token });
      } else {
        res.json({
          password: {
            name: "ValidatorError",
            message: "Wrong password!",
            properties: {
              message: "Wrong password!",
              type: "Wrong",
              path: "password",
              value: `passwordd`,
            },
            kind: "wrong",
            path: "password",
            value: `password`,
          },
        });
      }
    } else {
      res.json({
        email: {
          name: "ValidatorError",
          message: "Wrong Email Id",
          properties: {
            message: "Wrong Email Id",
            type: "Wrong",
            path: "email",
            value: `${email}`,
          },
          kind: "Wrong",
          path: "email",
          value: `${email}`,
        },
      });
    }
  } catch (e) {
    res.json(e.errors);
  }
});
// Creating EndPoint For User Login//
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "seceret_ecom");
      req.user = data.user;

      next();
    } catch (error) {
      res.status(401).send({ errors: "please authenticate using valid token" });
      console.log(error);
    }
  }
};

// Creating EndPoint For Add to fav//
app.post("/addtofav", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  if ((await userData.favourite[req.body.itemId]) < 1) {
    userData.favourite[req.body.itemId] = +1;
    await Users.findOneAndUpdate(
      { _id: req.user },
      { favourite: userData.favourite }
    );
    res.send("Added");
  } else {
    res.json("Item Is Already Exist!");
  }
});
// Creating EndPoint For Add to fav//

// Creating EndPoint For remove from fav//
app.post("/removefromfav", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  if ((await userData.favourite[req.body.itemId]) > 0) {
    userData.favourite[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user },
      { favourite: userData.favourite }
    );
    res.send("Removed");
  } else {
    res.json("Fav List Is Realy Empty!");
  }
});
// Creating EndPoint For remove from fav//

// Creating EndPoint For remove from fav//
app.post("/getfav", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  res.json(userData.favourite);
});
// Creating EndPoint For remove from fav//

// Creating EndPoint For Add to cart//
app.post("/addtocart", fetchUser, async (req, res) => {
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

app.post("/deletefromcart", fetchUser, async (req, res) => {
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
app.delete("/deleteallfromcart", fetchUser, async (req, res) => {
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

app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  res.json(userData.cartData);
});
// Creating EndPoint to get cart//

app.post("/getaccount", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  res.json(userData);
});

// Creating EndPoint to creat done order//
app.post("/addtodone", fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user });
  if (user) {
    await Users.updateOne({ _id: req.user }, { $push: { doneOrder: 1 } });
  }
  res.json("Done");
});
// Creating EndPoint to creat done order//
// Creating EndPoint to get done order//
app.post("/getdone", fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user });
  res.json(user.doneOrder.length);
});
// Creating EndPoint to get done order//

app.listen(port, () => {
  console.log("I'm Listen to 4000");
});
