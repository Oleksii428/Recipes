const router = require("express").Router();

const {roleController} = require("../controllers");
const {roleMiddleware} = require("../middlewares");

router.post(
	"/",
	roleMiddleware.isRoleCreateValid,
	roleMiddleware.isUnique,
	roleController.create
);

module.exports = router;
