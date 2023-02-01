const {authorRepository} = require("../repositories");
const {authService, emailService} = require("../services");
const {emailActions} = require("../enums");
const {dateHelper} = require("../helpers");
const {authorPresenter} = require("../presenters");

module.exports = {
	getByParams: async (req, res, next) => {
		try {
			const data = await authorRepository.getListByParams(req.query);

			const presentAuthors = authorPresenter.presentMany(data.authors);

			res.json({authors: presentAuthors, page: data.page});
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const {author} = req;

			const hashPassword = await authService.hashPassword(author.password);
			const newAuthor = await authorRepository.create({...author, password: hashPassword});

			await emailService.sendEmail(author.email, emailActions.WELCOME, {userName: author.userName});

			authorPresenter.present(newAuthor);

			res.status(201).json(newAuthor);
		} catch (e) {
			next(e);
		}
	},
	block: async (req, res, next) => {
		try {
			const {author, date} = req;

			await authorRepository.setBlock(author._id, date);
			const prettyDate = await dateHelper.getPrettyDate(date);

			res.json(`author ${author.userName} has been baned until ${prettyDate}`);
		} catch (e) {
			next(e);
		}
	},
	changeUserName: async (req, res, next) => {
		try {
			const {userName} = req.body;
			const {author} = req.tokenInfo;

			await authorRepository.updateById(author._id, {userName});

			res.status(201).json(`userName has been changed to ${userName}`);
		} catch (e) {
			next(e);
		}
	},
	delete: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;

			await authorRepository.deleteById(author._id);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	subscribe: async (req, res, next) => {
		try {
			const {author: subscriber} = req.tokenInfo;
			const {authorId} = req.params;

			await authorRepository.subscribe(subscriber._id, authorId);

			res.json("subscribed");
		} catch (e) {
			next(e);
		}
	},
	unSubscribe: async (req, res, next) => {
		try {
			const {author: subscriber} = req.tokenInfo;
			const {authorId} = req.params;

			await authorRepository.unSubscribe(subscriber._id, authorId);

			res.json("unsubscribed");
		} catch (e) {
			next(e);
		}
	},
	like: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			await authorRepository.like(author._id, authorId);

			res.json("liked");
		} catch (e) {
			next(e);
		}
	},
	unLike: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			await authorRepository.unLike(author._id, authorId);

			res.json("unliked");
		} catch (e) {
			next(e);
		}
	}
};
