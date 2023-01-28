const router = require("express").Router();

const {authorController} = require("../controllers");
const {authorMiddleware} = require("../middlewares");

router.get("/", authorController.getAll);
router.post("/",
	authorMiddleware.isBodyCreateValid,
	authorMiddleware.isFieldUniqueDynamically("userName"),
	authorMiddleware.isFieldUniqueDynamically("email"),
	authorController.create
);

module.exports = router;
