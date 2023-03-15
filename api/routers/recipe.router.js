const router = require("express").Router();

const {recipeController, stageController} = require("../controllers");
const {
	authMiddleware,
	recipeMiddleware,
	authorMiddleware,
	reviewMiddleware,
	kitchenMiddleware,
	categoryMiddleware,
	stageMiddleware,
	mediaMiddleware,
	galleryMiddleware
} = require("../middlewares");

router.get(
	"/",
	authMiddleware.checkAccessTokenIfExists,
	recipeController.getByQuery
);

router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isBodyCreateValid,
	kitchenMiddleware.isExists,
	categoryMiddleware.isExists,
	recipeController.create
);

router.get(
	"/notModerated",
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	recipeController.getByQuery
);

router.get(
	"/:recipeId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessTokenIfExists,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeController.getById
);

router.put(
	"/:recipeId",
	authMiddleware.checkAccessToken,
	authMiddleware.isMongoIdValid("recipeId"),
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.checkCreator,
	recipeMiddleware.isBodyUpdateValid,
	recipeController.update
);

router.delete(
	"/:recipeId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	recipeMiddleware.checkCreator,
	recipeController.delete
);

router.get(
	"/:recipeId/reviews",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessTokenIfExists,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeController.getReviews
);

router.patch(
	"/:recipeId/book-toggle",
	authMiddleware.checkAccessToken,
	authMiddleware.isMongoIdValid("recipeId"),
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeController.bookToggle
);

router.post(
	"/:recipeId/addStage",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.checkCreator,
	mediaMiddleware.checkPhoto,
	stageMiddleware.isBodyCreateValid,
	stageController.create
);

router.patch(
	"/:recipeId/addPhotos",
	mediaMiddleware.checkPhotos,
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.checkCreator,
	recipeController.addPhotos
);

router.patch(
	"/:recipeId/addVideo",
	mediaMiddleware.checkVideo,
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.checkCreator,
	recipeController.addVideo
);

router.delete(
	"/:recipeId/removeMedia/:mediaId",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.isMongoIdValid("mediaId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.checkCreator,
	galleryMiddleware.isExists,
	recipeController.removeMedia
);

router.patch(
	"/:recipeId/moderation",
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	recipeMiddleware.isModerated,
	recipeController.moderate
);

router.post(
	"/:recipeId/addReview",
	mediaMiddleware.checkPhoto,
	authMiddleware.isMongoIdValid("recipeId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	recipeMiddleware.isRecipeExistsDynamically("recipeId", "params", "_id"),
	reviewMiddleware.isBodyCreateValid,
	recipeController.addReview
);

module.exports = router;
