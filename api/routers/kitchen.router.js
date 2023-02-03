const router = require("express").Router();

const {kitchenController} = require("../controllers");
const {authMiddleware, authorMiddleware, kitchenMiddleware} = require("../middlewares");

router.get(
	"/",
	kitchenController.getByQuery
);

router.post(
	"/",
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	kitchenMiddleware.isBodyCreateValid,
	kitchenMiddleware.isUnique,
	kitchenController.create
);

module.exports = router;
