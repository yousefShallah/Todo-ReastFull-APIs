const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const userServices = require("../servicess/users");

const { SECRET = "secret" } = process.env;
console.log("SECRETSECRETSECRET", SECRET);
async function signup(req, res) {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await userServices.createUser({
      userName: req.body.userName,
      password: passwordHash,
    });
    const token = await jwt.sign(
      { userName: req.body.userName, userId: user.id },
      SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ status: false, error: `${error}` });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = await jwt.sign(
          { userName: user.userName, userId: user._id },
          SECRET
        );
        res.status(201).json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  signup,
  login,
};
