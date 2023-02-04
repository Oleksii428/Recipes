const router = require("express").Router();

const {reviewController} = require("../controllers");
const {authMiddleware, reviewMiddleware, authorMiddleware} = require("../middlewares");

router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.checkBanStatus,
	reviewMiddleware.isBodyCreateValid,
	reviewController.create
);

module.exports = router;
