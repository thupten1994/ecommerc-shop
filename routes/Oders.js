const express = require("express");
const oderRoute = express.Router();
const AsynHandler = require("express-async-handler");
const OderItem = require("../model/Oder");
const protect = require("../middleware/auth");

oderRoute.post(
  "/",
  protect,
  AsynHandler(async (req, res) => {
    const {
      user,
      oderItem,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      taxPrice,
      price,
    } = req.body;
    console.log(req.body);
    if (oderItem && oderItem.length === 0) {
      res.status(400);
      throw new Error(" No oder Item foud!");
    } else {
      const oder = await new OderItem({
        user,
        oderItem,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice,
        taxPrice,
        price,
      });

      const createdOder = await oder.save();
      res.status(200).send(createdOder);
    }
  })
);

module.exports = oderRoute;
