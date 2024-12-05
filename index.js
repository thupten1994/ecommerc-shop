require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userSeedRouter = require("./dataSeeder");
const userRoute = require("./routes/Users");
const productRoute = require("./routes/Products");
const oderRoute = require("./routes/Oders");

try {
  mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(
      app.listen(PORT || 3000, () => {
        console.log(` connected to db and server is running poart at ${PORT}`);
      })
    )
    .catch((e) => {
      console.log(e.message);
    });
} catch (e) {
  console.log(e.message);
}
app.use(express.json());
app.use("/seed", userSeedRouter);
app.use("/seed", userSeedRouter);
app.use("/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/oder", oderRoute);
