const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Faculte: { type: String, unique: true },
    productDetails: [
      {
        anne: String,
        imgUrl: String,
        imgAlt: String,
        title: String,
        desc: String,
        Quantity: Number,
        periode: String,
        page: Number,
        exempleurl: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
