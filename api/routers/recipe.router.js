const router = require("express").Router();

const {authMiddleware, recipeMiddleware, authorMiddleware} = require("../middlewares");
const {recipeController} = require("../controllers");

router.get(
	"/",
	recipeController.getByQuery
);
router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isBodyCreateValid,
	recipeController.create
);

router.get(
	"/:mongoId",
	authMiddleware.isMongoIdValid,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	recipeController.getById
);

router.patch(
	"/moderation/:mongoId",
	authMiddleware.isMongoIdValid,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	recipeMiddleware.isModerated,
	recipeController.moderate
);

module.exports = router;
