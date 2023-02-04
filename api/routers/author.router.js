const router = require("express").Router();

const {authorController} = require("../controllers");
const {authorMiddleware, authMiddleware} = require("../middlewares");

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
	"/block/:mongoId",
	authorMiddleware.isBlockTimeValid,
	authMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	authorMiddleware.isAuthorExistsDynamically("mongoId", "params", "_id"),
	authorMiddleware.isBlockAuthorNotAdmin,
	authorController.block
);

router.patch(
	"/subscribe-toggle/:mongoId",
	authMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAuthorExistsDynamically("mongoId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	authorMiddleware.isSubscribed,
	authorController.subscribeToggle,
);

router.patch(
	"/like-toggle/:mongoId",
	authMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAuthorExistsDynamically("mongoId", "params", "_id"),
	authorMiddleware.checkBanStatus,
	authorMiddleware.isLiked,
	authorController.likeToggle
);

module.exports = router;
