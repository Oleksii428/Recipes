const router = require("express").Router();

const {authorController} = require("../controllers");
const {authorMiddleware, authMiddleware} = require("../middlewares");

router.get("/",
	authorController.getAll
);
router.post("/",
	authorMiddleware.isBodyCreateValid,
	authorMiddleware.isFieldUniqueDynamically("userName", "author"),
	authorMiddleware.isFieldUniqueDynamically("email", "author"),
	authorController.create
);

router.patch("/userName",
	authMiddleware.checkAccessToken,
	authorMiddleware.isUpdateUserNameValid,
	authorMiddleware.isFieldUniqueDynamically("userName"),
	authorController.changeUserName
);

router.patch("/block/:authorId",
	authorMiddleware.isBlockTimeValid,
	authorMiddleware.isMongoIdValid,
	authMiddleware.checkAccessToken,
	authorMiddleware.isAdmin,
	authorMiddleware.isAuthorExistsDynamically("authorId", "params", "_id"),
	authorController.block
);

module.exports = router;
