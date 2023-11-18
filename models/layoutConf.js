const mongoose = require("mongoose");

const layoutconfSchema = new mongoose.Schema(
  {
    address: { type: String, required: false, default: "" },
    telephone: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    siteweb: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Layout", layoutconfSchema);
