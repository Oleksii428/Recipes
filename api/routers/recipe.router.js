const router = require("express").Router();

const {authMiddleware, recipeMiddleware, authorMiddleware} = require("../middlewares");
const {recipeController} = require("../controllers");

router.get(
	"/",
	recipeController.getByQuery
);

router.get(
	"/:mongoId",
	authMiddleware.isMongoIdValid,
	recipeController.getById
);

router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isBodyCreateValid,
	recipeController.create
);

module.exports = router;
