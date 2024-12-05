const express = require("express");
const oderRoute = express.Router();
const AsynHandler = require("express-async-handler");
const OderItem = require("../model/Oder");
const protect = require("../middleware/auth");
const Oder = require("../model/Oder");

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

oderRoute.put(
  "/:id/payment",
  protect,
  AsynHandler(async (req, res) => {
    const oder = await Oder.findById(req.params.id);
    if (oder) {
      (oder.isPaid = true),
        (oder.paidAt = Date.now()),
        (oder.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          updateed_time: req.body.updateed_time,
          email_address: req.body.email_address,
        });
      const updatedOder = await oder.save();
      res.send(updatedOder);
    } else {
      res.status(400);
      throw new Error(" No oder found");
    }
  })
);

oderRoute.get(
  "/",
  protect,
  AsynHandler(async (req, res) => {
    const oder = await Oder.find({ user: req.user._id }).sort({ _id: -1 });
    if (oder) {
      res.status(200).send(oder);
    } else {
      res.status(400);
      throw new Error("no oder found");
    }
  })
);
oderRoute.get(
  "/:id",
  protect,
  AsynHandler(async (req, res) => {
    const oder = await Oder.findById(req.params.id).populate("user", "email");
    if (oder) {
      res.status(200).send(oder);
    } else {
      res.status(400);
      throw new Error("no oder found");
    }
  })
);

module.exports = oderRoute;
