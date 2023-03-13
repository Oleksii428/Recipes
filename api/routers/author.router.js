const router = require("express").Router();

const {authorController} = require("../controllers");
const {authorMiddleware, authMiddleware} = require("../middlewares");

router.get(
	"/",
	authMiddleware.checkAccessTokenIfExists,
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

router.get(
	"/getById/:authorId",
	authMiddleware.isMongoIdValid("authorId"),
	authMiddleware.checkAccessTokenIfExists,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorController.getById
);

router.patch(
	"/userName",
	authMiddleware.checkAccessToken,
	authorMiddleware.isUpdateUserNameValid,
	authorMiddleware.isFieldUniqueDynamically("userName"),
	authorController.changeUserName
);

router.post(
	"/upload-avatar",
	authorMiddleware.checkUploadImage,
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	authorController.uploadAvatar
);

router.get(
	"/subscribers",
	authMiddleware.checkAccessToken,
	authorController.getSubscribers
);

router.get(
	"/recipes",
	authMiddleware.checkAccessToken,
	authorController.getRecipes
);

router.get(
	"/:authorId/recipes",
	authMiddleware.isMongoIdValid("authorId"),
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorController.getRecipesByParams
);

router.get(
	"/book",
	authMiddleware.checkAccessToken,
	authorController.getBook
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

module.exports = router;
