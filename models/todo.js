const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TodosSchema = Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "Todos", timestamps: true }
);

module.exports = mongoose.model("Todos", TodosSchema);
