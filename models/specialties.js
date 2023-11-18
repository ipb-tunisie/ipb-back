const mongoose = require("mongoose");

const specialtiesSchema = new mongoose.Schema(
  {
    Spécialités_médicales: [{ type: String, unique: true }],
    Spécialités_chirurgicales: [{ type: String, unique: true }],
    Spécialités_fondamentales: [{ type: String, unique: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("specialties", specialtiesSchema);
