const express = require("express");

const {
  editPassword,

  deleteUser,
} = require("../services/user/index");
const auth = require("../Middleware/auth");
const router = express.Router();

router.post("/editPassword", auth, editPassword);
router.delete("/delete", auth, deleteUser);
module.exports = router;
