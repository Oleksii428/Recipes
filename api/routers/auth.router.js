const router = require("express").Router();

const {authController} = require("../controllers");
const {authMiddleware, authorMiddleware} = require("../middlewares");

router.post("/login",
	authMiddleware.isBodyLoginValid,
	authorMiddleware.isAuthorExistsByEmailOrUserName,
	authController.login
);

router.post("/logout",
	authMiddleware.checkAccessToken,
	authController.logout
);

router.post("/refresh",
	authMiddleware.checkRefreshToken,
	authController.refresh
);

router.post("/password/forgot",
	authMiddleware.isBodyForgotValid,
	authorMiddleware.isAuthorExistsByEmailOrUserName,
	authController.sendEmailForgot
);
router.patch("/password/forgot",
	authMiddleware.isPasswordValid,
	authMiddleware.checkActionToken,
	authController.setPassword
);

module.exports = router;
