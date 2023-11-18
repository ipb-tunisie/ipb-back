const express = require("express");
const router = express.Router();

const layoutconfController = require("../controllers/layoutconfController");
const upload = require("../Middleware/upload");

router.get("/", layoutconfController.getAll);
router.post(
  "/edit",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  layoutconfController.edit
);
router.post(
  "/add",
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  layoutconfController.add
);

module.exports = router;
