const path = require("node:path");

const {authorRepository, recipeRepository, mediaRepository} = require("../repositories");
const {authService, emailService} = require("../services");
const {emailActions, uploadFileTypes} = require("../enums");
const {dateHelper, fileHelper} = require("../helpers");
const {config} = require("../configs");
const {recipePresenter, authorPresenter, bookPresenter, subscriberPresenter} = require("../presenters");

module.exports = {
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
	bookRemove: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {recipeId} = req.params;

			await authorRepository.removeRecipeFromBook(author._id, recipeId);

			res.sendStatus(204);
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
				await Promise.all([
					authorRepository.addRecipeToBook(author._id, recipe._id),
					recipeRepository.setBookCount(recipe._id, 1)
				]);
				action = "recipe has been added to book";
			} else {
				await Promise.all([
					authorRepository.removeRecipeFromBook(author._id, recipe._id),
					recipeRepository.setBookCount(recipe._id, -1)
				]);
				action = "recipe has been removed from book";
			}

			res.status(200).json(action);
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
	create: async (req, res, next) => {
		try {
			const {author} = req;

			const hashPassword = await authService.hashPassword(author.password);
			const newAuthor = await authorRepository.create({...author, password: hashPassword});

			res.status(201).json(authorPresenter.present(newAuthor));
			emailService.sendEmail(author.email, emailActions.WELCOME, {userName: author.userName});
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
	getBook: async (req, res, next) => {
		try {
			const book = await authorRepository.getBook(req.tokenInfo.author._id);

			res.json(bookPresenter.presentMany(book));
		} catch (e) {
			next(e);
		}
	},
	getByParams: async (req, res, next) => {
		try {
			const data = await authorRepository.getListByParams(req.query);
			const {authors, page, count} = data;

			res.json({authors, page, count});
		} catch (e) {
			next(e);
		}
	},
	getRecipes: async (req, res, next) => {
		try {
			let recipes = await recipeRepository.getByAuthorId(req.tokenInfo.author._id);
			recipes = recipePresenter.presentMany(recipes);
			res.json(recipes);
		} catch (e) {
			next(e);
		}
	},
	getSubscribers: async (req, res, next) => {
		try {
			let subscribers = await authorRepository.getSubscribers(req.tokenInfo.author._id);
			subscribers = subscriberPresenter.presentMany(subscribers);

			res.json(subscribers);
		} catch (e) {
			next(e);
		}
	},
	likeToggle: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;
			let action;

			if (!req.liked) {
				await authorRepository.like(author._id, authorId);
				action = "liked";
			} else {
				await authorRepository.unLike(author._id, authorId);
				action = "unliked";
			}

			res.status(200).json(action);
		} catch (e) {
			next(e);
		}
	},
	sendComplain: async (req, res, next) => {
		try {
			const {complain, author, tokenInfo} = req;

			const admins = await authorRepository.getAdmins();

			for (const admin of admins) {
				console.log("sending complain email...");
				emailService.sendEmail(admin.email, emailActions.COMPLAIN, {
					sender: tokenInfo.author.userName,
					authorLink: `${config.FRONTEND_URL}/recipes/${author._id}`,
					authorName: author.userName,
					complain: complain.text
				});
			}

			res.json("complain sent");
		} catch (e) {
			next(e);
		}
	},
	subscribeToggle: async (req, res, next) => {
		try {
			const {author: subscriber} = req.tokenInfo;
			const {authorId} = req.params;
			let action;

			if (!req.subscribed) {
				await authorRepository.subscribe(subscriber._id, authorId);
				action = "subscribed";
				emailService.sendEmail(req.author.email, emailActions.NEW_SUBSCRIBER, {
					userName: req.author.userName,
					subscriber: subscriber.userName
				});
			} else {
				await authorRepository.unSubscribe(subscriber._id, authorId);
				action = "unsubscribed";
			}
			res.status(200).json(action);
		} catch (e) {
			next(e);
		}
	},
	uploadAvatar: async (req, res, next) => {
		try {
			const {avatar} = req.files;
			const {author} = req.tokenInfo;

			const fileName = fileHelper.buildFileName(avatar.name, uploadFileTypes.AUTHORS, author.id);

			const [newMedia] = await Promise.all([
				mediaRepository.create({path: fileName}),
				avatar.mv(path.join(process.cwd(), "uploads", fileName))
			]);
			await authorRepository.setAvatar(author._id, newMedia._id);

			res.json("uploaded");
		} catch (e) {
			next(e);
		}
	}
};
