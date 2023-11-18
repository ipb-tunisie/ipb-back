const express = require("express");
const router = express.Router();

const specialtiesController = require("../controllers/specialiteConcoursController");

router.get("/", specialtiesController.getAll);
router.post("/add", specialtiesController.add);
// router.post("/edit", specialtiesController.edit);

module.exports = router;
