const mongoose = require("mongoose");

const productCoursSchema = new mongoose.Schema(
  {
    service: { type: String, unique: true }, // Make the service field unique
    productDetails: [
      {
        imgUrl: String,
        imgAlt: String,
        title: String,
        specialite: String,
        desc: String,
        Quantity: Number,
        page: Number,
        Laser: String,
        oldLaser: String,
        Jet: String,
        oldJet: String,
        Speral: String,
        oldSperal: String,
        achaud: String,
        oldachaud: String,
        Registre: String,
        olRegistre: String,
        exempleurl: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCours", productCoursSchema);
