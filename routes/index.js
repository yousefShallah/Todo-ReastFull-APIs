const express = require("express");
const { apiAuth } = require("../middleware/auth");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/todos", apiAuth, require("./todos"));

module.exports = router;
