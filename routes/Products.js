const express = require("express");
const productRoute = express.Router();
const AsynHandler = require("express-async-handler");
const Product = require("../model/Products");

productRoute.get(
  "/",

  AsynHandler(async (req, res) => {
    const product = await Product.find({});
    res.send(product);
  })
);

productRoute.get(
  "/:id",
  AsynHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        throw new Error(res.status(401), "no product with this ID");
      }
      res.send(product);
    } catch (e) {
      throw new Error(" Not a vaild ID");
    }
  })
);

module.exports = productRoute;
