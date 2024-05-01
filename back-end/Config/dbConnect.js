const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Success Connect");
  })
  .catch((error) => {
    console.log(`error:`, error);
  });


