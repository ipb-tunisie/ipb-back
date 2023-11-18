const mongoose = require("mongoose");

const ipbpackSchema = new mongoose.Schema(
  {
    imgUrl: String,
    imgAlt: String,
    title: String,
    specialite: String,
    desc: String,
    Quantity: Number,
  },

  { timestamps: true }
);

module.exports = mongoose.model("ipbpack", ipbpackSchema);
