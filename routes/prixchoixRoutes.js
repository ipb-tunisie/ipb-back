const express = require("express");
const router = express.Router();

const prixchoixController = require("../controllers/prixchoixController");

router.get("/", prixchoixController.getAll);
router.post("/edit", prixchoixController.edit);


module.exports = router;
