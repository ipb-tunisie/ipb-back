const express = require("express");
const router = express.Router();

const specialtiesController = require("../controllers/specialtiesController");

router.get("/", specialtiesController.getAll);
router.post("/add", specialtiesController.add);
router.post("/edit", specialtiesController.edit);
// router.post("/delete", ipbbpackController.remove);

module.exports = router;
