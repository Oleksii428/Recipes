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

module.exports = router;
