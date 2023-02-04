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
	recipeMiddleware.checkCreator,
	recipeController.getById
);
router.put(
	"/:mongoId",
	authMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	recipeMiddleware.checkCreator,
	recipeMiddleware.isBodyUpdateValid,
	recipeController.update
);

router.patch(
	"/moderation/:mongoId",
	authMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	recipeMiddleware.isModerated,
	recipeController.moderate
);

module.exports = router;
