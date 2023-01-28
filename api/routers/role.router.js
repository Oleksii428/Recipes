const router = require("express").Router();

const {roleController} = require("../controllers");

router.post("/", roleController.create)

module.exports = router;
