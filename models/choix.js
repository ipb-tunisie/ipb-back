const mongoose = require("mongoose");

const choixSchema = new mongoose.Schema({
  prixJet: Number,
  prixLaser: Number,
  prixSperal: Number,
  prixachaud: Number,
  prixRegistre: Number,
  oldprixJet: Number,
  oldprixLaser: Number,
  oldprixSperal: Number,
  oldprixachaud: Number,
  oldprixRegistre: Number,
});

module.exports = mongoose.model("Prixchoix", choixSchema);
