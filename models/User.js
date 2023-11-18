const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "First Name required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 5,
      required: [false, "Password required"],
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      defalut: "client",
      required: [true, "Role required"],
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: Date.now(),
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(
    {
      user: {
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        enabled: user.enabled,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 31556926, // 1 year in seconds
    }
  );

  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }
    return user;
  }
  return null;
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
