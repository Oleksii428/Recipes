const router = require("express").Router();

const {authorController} = require("../controllers");
const {authorMiddleware, authMiddleware, recipeMiddleware} = require("../middlewares");

router.get(
	"/",
	authorController.getByParams
);
router.post(
	"/",
	authorMiddleware.isBodyCreateValid,
	authorMiddleware.isFieldUniqueDynamically("userName", "author"),
	authorMiddleware.isFieldUniqueDynamically("email", "author"),
	authorController.create
);
router.delete(
	"/",
	authMiddleware.checkAccessToken,
	authorController.delete
);

router.patch(
	"/userName",
	authMiddleware.checkAccessToken,
	authorMiddleware.isUpdateUserNameValid,
	authorMiddleware.isFieldUniqueDynamically("userName"),
	authorController.changeUserName
);

router.patch(
	"/:authorId/complain",
	authMiddleware.isMongoIdValid("authorId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.isBodyComplainValid,
	authorController.sendComplain
);

router.patch(
	"/:authorId/block",
	authorMiddleware.isBlockTimeValid,
	authMiddleware.isMongoIdValid("authorId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.isBlockAuthorNotAdmin,
	authorController.block
);

router.patch(
	"/:authorId/subscribe-toggle",
	authMiddleware.isMongoIdValid("authorId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	authorMiddleware.isSubscribed,
	authorController.subscribeToggle,
);

router.patch(
	"/:authorId/like-toggle",
	authMiddleware.isMongoIdValid("authorId"),
	authMiddleware.checkAccessToken,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	authorMiddleware.isLiked,
	authorController.likeToggle
);

router.patch(
	"/:authorId/book-toggle",
	authMiddleware.checkAccessToken,
	authMiddleware.isMongoIdValid("authorId"),
	recipeMiddleware.isRecipeExistsDynamically("authorId", "params", "_id"),
	authorController.bookToggle
);

router.delete(
	"/:recipeId/book-remove",
	authMiddleware.checkAccessToken,
	authMiddleware.isMongoIdValid("recipeId"),
	authorController.bookRemove
);

module.exports = router;
