const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Controll/Controll.js");
app.use(cors());
app.use(express.json());
require("./Config/dbConnect.js");
app.use("/", router);
app.use("/images", express.static("upload/images"));
app.listen(port, () => {
  console.log("I'm Listen to 4000");
});
