const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload");

const productController = require("../controllers/productController");

router.get("/", productController.getAll);

router.post(
  "/add",

  productController.add
);
router.post("/edit", productController.edit);
router.post("/delete", productController.remove);


module.exports = router;
