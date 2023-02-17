const router = require("express").Router();

const {recipeController} = require("../controllers");
const {authMiddleware, authorMiddleware, reviewMiddleware} = require("../middlewares");

router.delete(
	"/:reviewId",
	authMiddleware.isMongoIdValid("reviewId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	reviewMiddleware.isReviewExistsDynamically("reviewId", "params", "_id"),
	reviewMiddleware.checkOwner,
	recipeController.deleteReview
);

module.exports = router;
