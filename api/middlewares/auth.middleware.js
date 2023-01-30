const {authValidator} = require("../validators");
const {ApiError} = require("../errors");
const {authService} = require("../services");
const {tokenTypes, tokenActions} = require("../enums");
const {authRepository, actionTokenRepository} = require("../repositories");

module.exports = {
	isBodyLoginValid: async (req, res, next) => {
		try {
			const validatedBody = authValidator.createAuthValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 404);
			}

			req.body = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyForgotValid: async (req, res, next) => {
		try {
			const validatedBody = authValidator.createForgotValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 404);
			}

			req.body = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isPasswordValid: async (req, res, next) => {
		try {
			const validatedBody = authValidator.createPasswordValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 401);
			}

			req.body.password = validatedBody.value.password;
			next();
		} catch (e) {
			next(e);
		}
	},
	checkActionToken: async (req, res, next) => {
		try {
			const {token: actionToken} = req.query;

			if (!actionToken) {
				throw new ApiError("No token", 401);
			}

			authService.checkActionToken(actionToken, tokenActions.FORGOT_PASSWORD);

			const tokenInfo = await actionTokenRepository.findOne({
				token: actionToken,
				tokenType: tokenActions.FORGOT_PASSWORD
			});

			if (!tokenInfo) {
				throw new ApiError("Token not found in database", 401);
			}

			tokenInfo.populate("author");
			req.token = actionToken;
			req.authorId = tokenInfo.author;

			next();
		} catch (e) {
			next(e);
		}
	},
	checkAccessToken: async (req, res, next) => {
		try {
			const accessToken = req.get("Authorization");

			if (!accessToken) {
				throw new ApiError("No token", 401);
			}

			authService.checkToken(accessToken, tokenTypes.accessToken);

			const tokenInfo = await authRepository.findOneWidthAuthor({accessToken: accessToken});

			if (!tokenInfo) {
				throw new ApiError("No token in data base", 401);
			}

			req.tokenInfo = tokenInfo;
			next();
		} catch (e) {
			next(e);
		}
	},
	checkRefreshToken: async (req, res, next) => {
		try {
			const refreshToken = req.get("Authorization");

			if (!refreshToken) {
				throw new ApiError("No token", 401);
			}

			authService.checkToken(refreshToken, tokenTypes.refreshToken);

			const tokenInfo = await authRepository.findOne({refreshToken});

			if (!tokenInfo) {
				throw new ApiError("No token in data base", 401);
			}

			req.tokenInfo = tokenInfo;
			next();
		} catch (e) {
			next(e);
		}
	}
};
