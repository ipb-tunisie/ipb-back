const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema(
  {
    description: { type: String, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("description", descriptionSchema);
