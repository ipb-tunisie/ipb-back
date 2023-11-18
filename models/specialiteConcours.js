const mongoose = require("mongoose");

const specialiteConcoursSchema = new mongoose.Schema(
  {
    Spécialités: [{ type: String, unique: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "specialtiesConcours",
  specialiteConcoursSchema
);
