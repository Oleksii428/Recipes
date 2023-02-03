const router = require("express").Router();

const {authMiddleware, recipeMiddleware} = require("../middlewares");
const {recipeController} = require("../controllers");

router.post(
	"/",
	authMiddleware.checkAccessToken,
	recipeMiddleware.isBodyCreateValid,
	recipeController.create
);

module.exports = router;
