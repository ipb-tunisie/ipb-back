const express = require("express");
const router = express.Router();

const ipbbpackController = require("../controllers/IPBPACKController");

router.get("/", ipbbpackController.getAll);
router.post("/add", ipbbpackController.add);
router.post("/edit", ipbbpackController.edit);
router.post("/delete", ipbbpackController.remove);

module.exports = router;
