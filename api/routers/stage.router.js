const router = require("express").Router();

const {stageController} = require("../controllers");
const {authMiddleware, stageMiddleware, mediaMiddleware} = require("../middlewares");

router.post(
	"/",
	mediaMiddleware.checkPhoto,
	authMiddleware.checkAccessToken,
	stageMiddleware.isBodyCreateValid,
	stageController.create
);

module.exports = router;
