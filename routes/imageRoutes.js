const express = require("express");
const router = express.Router();

const imagecontroller = require("../controllers/imageController");
const upload = require("../Middleware/upload");

router.get("/", imagecontroller.getAll);
router.post(
  "/edit",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  imagecontroller.edit
);
router.post(
  "/add",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  imagecontroller.add
);
router.post("/delete", imagecontroller.remove);
module.exports = router;
