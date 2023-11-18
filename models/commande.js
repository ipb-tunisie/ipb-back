const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    firstName: String,

    tel: String,
    email: String,
    status: String,
    adress: String,

    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: Number,
        producttitle: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Commande", commandeSchema);
