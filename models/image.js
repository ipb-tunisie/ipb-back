const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    img: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("image", imageSchema);
