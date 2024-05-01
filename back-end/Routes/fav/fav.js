const express = require("express");
const Users = require("../../models/User.js");
const router = express.Router();

const fetchUser = require("../../Middleware/auth.js");



// Creating EndPoint For Add to fav//
router.post("/addtofav", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  if ((await userData.favourite[req.body.itemId]) < 1) {
    userData.favourite[req.body.itemId] = +1;
    await Users.findOneAndUpdate(
      { _id: req.user },
      { favourite: userData.favourite }
    );
    res.json({ success: true });
  } else {
    res.json("Item Is Already Exist!");
  }
});
// Creating EndPoint For Add to fav//

// Creating EndPoint For remove from fav//
router.post("/removefromfav", fetchUser, async (req, res) => {
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
router.post("/getfav", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user });
  res.json(userData.favourite);
});
// Creating EndPoint For remove from fav//


module.exports = router;
