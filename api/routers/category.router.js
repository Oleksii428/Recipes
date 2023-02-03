const router = require("express").Router();

const {categoryController} = require("../controllers");
const {categoryMiddleware, authMiddleware, authorMiddleware} = require("../middlewares");

router.get(
	"/",
	categoryController.getByQuery
);

router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	categoryMiddleware.isBodyCreateValid,
	categoryMiddleware.isUnique,
	categoryController.create
);

module.exports = router;
