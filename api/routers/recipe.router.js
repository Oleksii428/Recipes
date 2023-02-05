const router = require("express").Router();

const {authMiddleware, recipeMiddleware, authorMiddleware, reviewMiddleware} = require("../middlewares");
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
	authMiddleware.isMongoIdValid(),
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	recipeController.getById
);
router.put(
	"/:mongoId",
	authMiddleware.isMongoIdValid(),
	authMiddleware.checkAccessToken,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	recipeMiddleware.checkCreator,
	recipeMiddleware.isBodyUpdateValid,
	recipeController.update
);
router.delete(
	"/:mongoId",
	authMiddleware.isMongoIdValid(),
	authMiddleware.checkAccessToken,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	recipeMiddleware.checkCreator,
	recipeController.delete
);

router.post(
	"/addReview/:recipeId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	reviewMiddleware.isBodyCreateValid,
	recipeController.addReview
);
router.delete(
	"/removeReview/:recipeId/:reviewId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.isMongoIdValid("reviewId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	reviewMiddleware.isReviewExistsDynamically("reviewId", "params", "_id"),
	reviewMiddleware.checkOwner,
	recipeController.deleteReview
);

router.patch(
	"/moderation/:mongoId",
	authMiddleware.isMongoIdValid(),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	recipeMiddleware.isRecipeExistsDynamically("mongoId", "params", "_id"),
	recipeMiddleware.isModerated,
	recipeController.moderate
);

module.exports = router;
