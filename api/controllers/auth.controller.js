const {authService, emailService} = require("../services");
const {authRepository, actionTokenRepository, authorRepository} = require("../repositories");
const {tokenActions, emailActions} = require("../enums");
const {config} = require("../configs");
const {authorPresenter} = require("../presenters");

module.exports = {
	login: async (req, res, next) => {
		try {
			const {author, body} = req;

			await author.comparePasswords(body.password);

			const tokenPair = authService.generateTokenPair({userName: author.userName});

			const tokenPairInfo = await authRepository.create(tokenPair, author.id);

			res.json(tokenPairInfo);
		} catch (e) {
			next(e);
		}
	},
	isLogin: async (req, res, next) => {
		try {
			const author = authorPresenter.present(req.tokenInfo.author);

			res.json(author);
		} catch (e) {
			next(e);
		}
	},
	logout: async (req, res, next) => {
		try {
			const {accessToken} = req.tokenInfo;

			await authRepository.deleteOne({accessToken});

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	refresh: async (req, res, next) => {
		try {
			const {refreshToken, author: authorId} = req.tokenInfo;

			await authRepository.deleteOne({refreshToken});

			const newTokenPair = authService.generateTokenPair({id: authorId});

			const newTokenPairInfo = await authRepository.create(newTokenPair, authorId);

			res.status(200).json(newTokenPairInfo);
		} catch (e) {
			next(e);
		}
	},
	sendEmailForgot: async (req, res, next) => {
		try {
			const {author} = req;

			const actionToken = authService.generateActionToken(tokenActions.FORGOT_PASSWORD, {email: author.email});

			const newActionToken = {
				token: actionToken, tokenType: tokenActions.FORGOT_PASSWORD, author: author._id
			};

			await actionTokenRepository.create(newActionToken);

			const forgotPasswordUrl = `${config.FRONTEND_URL}/password/forgot?token=${actionToken}`;

			await emailService.sendEmail(author.email, emailActions.FORGOT_PASS, {
				userName: author.userName, forgotPasswordUrl
			});

			res.json("Check your email");
		} catch (e) {
			next(e);
		}
	},
	setPassword: async (req, res, next) => {
		try {
			const {password} = req.body;

			const hashPassword = await authService.hashPassword(password);

			await actionTokenRepository.deleteOne({
				token: req.token
			});

			await authorRepository.updateById(req.authorId, {password: hashPassword});

			res.json("Password has been restored. Try to login again");
		} catch (e) {
			next(e);
		}
	}
};
