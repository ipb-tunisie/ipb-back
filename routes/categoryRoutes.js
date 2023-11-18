const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAll);
router.post("/add", categoryController.add);
router.post("/edit", categoryController.edit);
router.post("/delete", categoryController.remove);

module.exports = router;
