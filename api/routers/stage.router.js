const router = require("express").Router();

const {stageController} = require("../controllers");
const {authMiddleware, stageMiddleware, mediaMiddleware} = require("../middlewares");

router.put(
	"/:stageId",
	authMiddleware.isMongoIdValid("stageId"),
	authMiddleware.checkAccessToken,
	stageMiddleware.isStageExists,
	mediaMiddleware.checkPhoto,
	stageMiddleware.isBodyUpdateValid,
	stageController.update
);

router.delete(
	"/:stageId",
	authMiddleware.isMongoIdValid("stageId"),
	authMiddleware.checkAccessToken,
	stageMiddleware.isStageExists,
	stageController.delete
);

module.exports = router;
