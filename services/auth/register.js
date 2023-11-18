const {
  validateRegisterInput,
} = require("../../models/modelsValidator/userValidator");
const { generateToken } = require("../../utils/tokens");
const mongoose = require("mongoose");

const register = async (req, res) => {
  try {
    const { error } = validateRegisterInput(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const User = mongoose.model("User");
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already registered. Enter another email" });
    }

    user = new User(req.body);
    const token = user.generateAuthToken();
    user.token = token;
    user.role = "client";
    user.accountType = "local";
    const hash = generateToken();
    user.confirmationToken = hash;

    user.save();
    return res.status(200).send({
      message: `acount created.`,
    });
 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.register = register;
