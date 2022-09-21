const jwt = require("jsonwebtoken");

const apiAuth = async (req, res, next) => {
  const { SECRET = "secret" } = process.env;
  const token =
    req.headers["authorization"]?.split(" ") ||
    req.headers["Authorization"]?.split(" ");
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(`${token[1]}`, SECRET);
    if (!decoded) return res.sendStatus(403);
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = {
  apiAuth,
};
