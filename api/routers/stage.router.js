const router = require("express").Router();

const {stageController} = require("../controllers");
const {authMiddleware, stageMiddleware} = require("../middlewares");

router.post(
	"/",
	authMiddleware.checkAccessToken,
	stageMiddleware.isBodyCreateValid,
	stageController.create
);

module.exports = router;
