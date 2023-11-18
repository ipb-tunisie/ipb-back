const express = require("express");
const router = express.Router();

const commandeController = require("../controllers/commandeController");

router.get("/", commandeController.getAll);
router.post("/edit", commandeController.edit);
router.post("/add", commandeController.add);
router.post("/delete", commandeController.remove);
router.post("/valid", commandeController.valid);


module.exports = router;
