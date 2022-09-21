const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UsersSchema = Schema(
  {
    password: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("users", UsersSchema);
