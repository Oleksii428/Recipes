const {authorRepository, recipeRepository} = require("../repositories");
const {authService, emailService} = require("../services");
const {emailActions} = require("../enums");
const {dateHelper} = require("../helpers");
const {authorPresenter} = require("../presenters");
const {WELCOME, NEW_SUBSCRIBER} = require("../enums/email.actions.enum");
const {ApiError} = require("../errors");

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

			res.status(201).json(authorPresenter.present(newAuthor));
			await emailService.sendEmail(author.email, emailActions.WELCOME, {userName: author.userName});
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
	subscribeToggle: async (req, res, next) => {
		try {
			const {author: subscriber} = req.tokenInfo;
			const {mongoId} = req.params;
			let action;

			if (!req.subscribed) {
				await authorRepository.subscribe(subscriber._id, mongoId);
				action = "subscribed";
				await emailService.sendEmail(req.author.email, NEW_SUBSCRIBER, {
					userName: req.author.userName,
					subscriber: subscriber.userName
				});
			} else {
				await authorRepository.unSubscribe(subscriber._id, mongoId);
				action = "unsubscribed";
			}
			res.status(200).json(action);
		} catch (e) {
			next(e);
		}
	},
	likeToggle: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {mongoId} = req.params;
			let action;

			if (!req.liked) {
				await authorRepository.like(author._id, mongoId);
				action = "liked";
			} else {
				await authorRepository.unLike(author._id, mongoId);
				action = "unliked";
			}

			res.status(200).json(action);
		} catch (e) {
			next(e);
		}
	},
	bookToggle: async (req, res, next) => {
		try {
			const {recipe, tokenInfo} = req;
			const {author} = tokenInfo;
			let action;

			if (!tokenInfo.author.book.includes(recipe.id)) {
				await authorRepository.addRecipeToBook(author._id, recipe._id);
				await recipeRepository.setBookCount(recipe._id, 1);
				action = "recipe has been added to book";
			} else {
				await authorRepository.removeRecipeFromBook(author._id, recipe._id);
				await recipeRepository.setBookCount(recipe._id, -1);
				action = "recipe has been removed from book";
			}

			res.status(200).json(action);
		} catch (e) {
			next(e);
		}
	},
	bookRemove: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {mongoId: recipeId} = req.params;

			await authorRepository.removeRecipeFromBook(author._id, recipeId);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	}
};
