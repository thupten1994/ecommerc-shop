const express = require("express");
const userRoute = express.Router();
const AsynHandler = require("express-async-handler");
const User = require("../model/Users");
const { id } = require("mongoose/lib/types/documentArray/methods");
const protect = require("../middleware/auth");

// login
userRoute.post(
  "/login",
  AsynHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
      res.send({
        _id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        token: await user.generateToken(),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error(" Invalid password or email");
    }
  })
);

// register route

userRoute.post(
  "/register",
  AsynHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const userExisted = await User.findOne({ email });
    if (userExisted) {
      res.status(401);
      throw new Error(" User already existed");
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          token: await user.generateToken(),
        });
        console.log(user.token);
      } else {
        throw new Error(" Invalid data or email");
      }
    }
  })
);

// log profile
userRoute.get(
  "/profile",
  protect,
  AsynHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("no user existed with this user =");
    }
  })
);

// update profile
userRoute.put(
  "/profile",
  protect,
  AsynHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(401);
      throw new Error("this User is not availabel");
    }
  })
);

module.exports = userRoute;
