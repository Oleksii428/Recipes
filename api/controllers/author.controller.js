const path = require("node:path");

const {
	authorRepository,
	recipeRepository,
	mediaRepository,
	likeRepository,
	subscriptionRepository,
	subscriberRepository,
	bookRepository
} = require("../repositories");
const {authService, emailService} = require("../services");
const {emailActions, uploadFileTypes} = require("../enums");
const {dateHelper, fileHelper} = require("../helpers");
const {config} = require("../configs");
const {recipePresenter, authorPresenter, subscriberPresenter} = require("../presenters");

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
			await authorRepository.create({...author, password: hashPassword});

			res.sendStatus(201);
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
			const book = await bookRepository.findByAuthorId(req.tokenInfo.author._id);
			const presentedBook = recipePresenter.presentMany(book);

			res.status(200).json(presentedBook);
		} catch (e) {
			next(e);
		}
	},
	getById: async (req, res, next) => {
		try {
			let author = await authorRepository.getById(req.author._id);
			author = authorPresenter.present(author);

			res.json(author);
		} catch (e) {
			next(e);
		}
	},
	getByParams: async (req, res, next) => {
		try {
			const data = await authorRepository.getListByParams(req.query);
			const {authors, page, count} = data;
			const presentAuthors = authorPresenter.presentMany(authors);

			res.json({authors: presentAuthors, page, count});
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
	getRecipesByParams: async (req, res, next) => {
		try {
			let data = await recipeRepository.getByQuery(req.query, req.author._id,);
			const presentRecipes = recipePresenter.presentManyWithCreator(data.recipes);

			res.json({...data, recipes: presentRecipes});
		} catch (e) {
			next(e);
		}
	},
	getSubscribers: async (req, res, next) => {
		try {
			let subscribers = await subscriberRepository.getSubscribers(req.tokenInfo.author._id);
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
				await Promise.all([
					likeRepository.create(author._id, authorId),
					authorRepository.incTotalLikes(author._id, authorId)
				]);
				action = "liked";
			} else {
				await Promise.all([
					likeRepository.delete(author._id, authorId),
					authorRepository.decTotalLikes(author._id, authorId)
				]);
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
				await Promise.all([
					subscriptionRepository.create(subscriber._id, authorId),
					subscriberRepository.create(subscriber._id, authorId)
				]);

				emailService.sendEmail(req.author.email, emailActions.NEW_SUBSCRIBER, {
					userName: req.author.userName,
					subscriber: subscriber.userName
				});

				action = "subscribed";
			} else {
				await Promise.all([
					subscriptionRepository.delete(subscriber._id, authorId),
					subscriberRepository.delete(subscriber._id, authorId)
				]);

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
