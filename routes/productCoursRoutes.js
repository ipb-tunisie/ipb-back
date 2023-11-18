const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");

const productCoursController = require("../controllers/productCoursController");

router.get("/", productCoursController.getAll);
router.get("/one", productCoursController.getOne);
router.post("/add", productCoursController.add);
router.post("/edit", productCoursController.edit);
router.post("/delete", productCoursController.remove);
router.post("/maketop", productCoursController.makeTop);
router.post("/similaire", productCoursController.similaire);
router.get("/top", productCoursController.top);

module.exports = router;
