const express = require("express");
const router = express.Router();

const descriptionController = require("../controllers/descriptionController");

router.get("/", descriptionController.getAll);
router.post("/add", descriptionController.add);
router.post("/edit", descriptionController.edit);
router.post("/delete", descriptionController.remove);

module.exports = router;
