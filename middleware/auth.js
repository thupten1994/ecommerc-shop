const jwt = require("jsonwebtoken");
const AsynHandler = require("express-async-handler");

const protect = AsynHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = jwt.verify(
        req.headers.authorization,
        process.env.JWTPRIVATEKEY
      );
      req.user = decode;
      next();
    } catch (e) {
      throw new Error("Wrong token");
    }
  } else {
    throw new Error("not Authorized ");
  }
});

module.exports = protect;
