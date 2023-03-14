const path = require("node:path");

const {
	recipeRepository,
	authorRepository,
	reviewRepository,
	mediaRepository,
	subscriberRepository,
	bookRepository, galleryRepository
} = require("../repositories");
const {
	CREATE_RECIPE_MODERATION,
	NEW_SUBSCRIBED_RECIPE,
	UPDATE_RECIPE_MODERATION
} = require("../enums/email.actions.enum");
const {emailService} = require("../services");
const {config} = require("../configs");
const {fileHelper} = require("../helpers");
const {uploadFileTypes} = require("../enums");
const {recipePresenter, reviewPresenter} = require("../presenters");

module.exports = {
	addPhotos: async (req, res, next) => {
		try {
			const {recipe, files} = req;

			const imagesToUpload = Object.values(files);

			for (const photo of imagesToUpload) {
				const fileName = fileHelper.buildFileName(photo.name, uploadFileTypes.RECIPES, recipe.id);
				const [newMedia] = await Promise.all([
					mediaRepository.create({"path": fileName}),
					photo.mv(path.join(process.cwd(), "uploads", fileName))
				]);
				await galleryRepository.create(recipe._id, newMedia._id);
			}

			res.json("ok");
		} catch (e) {
			next(e);
		}
	},
	addReview: async (req, res, next) => {
		try {
			const recipe = req.recipe;
			const newReview = await reviewRepository.create(req.review);

			await Promise.all([
				recipeRepository.setRating(recipe._id)
			]);

			if (req.photo) {
				const fileName = fileHelper.buildFileName(req.photo.name, uploadFileTypes.REVIEWS, newReview.id);
				const newMedia = await mediaRepository.create({path: fileName});
				await Promise.all([
					req.photo.mv(path.join(process.cwd(), "uploads", fileName)),
					reviewRepository.addPhoto(newReview._id, newMedia._id)
				]);
			}

			res.sendStatus(201);
		} catch (e) {
			next(e);
		}
	},
	addVideo: async (req, res, next) => {
		try {
			const {recipe, video} = req;

			const fileName = fileHelper.buildFileName(video.name, uploadFileTypes.RECIPES, recipe.id);
			const [newMedia] = await Promise.all([
				mediaRepository.create({"path": fileName}),
				video.mv(path.join(process.cwd(), "uploads", fileName))
			]);
			await galleryRepository.create(recipe._id, newMedia._id);

			res.json("ok");
		} catch (e) {
			next(e);
		}
	},
	bookToggle: async (req, res, next) => {
		try {
			const {recipe, tokenInfo} = req;
			const {author} = tokenInfo;
			let action;

			const recipeInBook = await bookRepository.findOne(recipe._id, req.tokenInfo.author._id);

			if (!recipeInBook) {
				await Promise.all([
					bookRepository.create(recipe._id, author._id),
					recipeRepository.setBookCount(recipe._id, 1)
				]);
				action = "recipe has been added to book";
			} else {
				await Promise.all([
					bookRepository.deleteOne(recipe._id, author._id),
					recipeRepository.setBookCount(recipe._id, -1)
				]);
				action = "recipe has been removed from book";
			}

			res.status(200).json(action);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const newRecipe = req.recipe;

			const [createdRecipe, admins, subscribers] = await Promise.all([
				recipeRepository.create({...newRecipe, creator: author._id}),
				authorRepository.getAdmins(),
				subscriberRepository.getSubscribers(author._id)
			]);

			for (const admin of admins) {
				emailService.sendEmail(admin.email, CREATE_RECIPE_MODERATION, {
					userName: author.userName,
					recipeDetails: `${config.FRONTEND_URL}/recipes/${createdRecipe._id}`
				});
			}
			if (subscribers) {
				for (const subscriber of subscribers) {
					emailService.sendEmail(subscriber.email, NEW_SUBSCRIBED_RECIPE, {
						userName: author.userName,
						recipeDetails: `${config.FRONTEND_URL}/recipes/${createdRecipe._id}`
					});
				}
			}

			res.status(201).json(createdRecipe._id);
		} catch (e) {
			next(e);
		}
	},
	delete: async (req, res, next) => {
		try {
			await recipeRepository.deleteById(req.recipe._id);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	deleteReview: async (req, res, next) => {
		try {
			const {review} = req;

			await reviewRepository.deleteById(review._id);
			await recipeRepository.setRating(review.recipe);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	getById: async (req, res, next) => {
		try {
			let recipe = await recipeRepository.getById(req.params.recipeId);
			if (req.tokenInfo) {
				const {author} = req.tokenInfo;
				const authorBookIds = await bookRepository.getBookIdArray(author._id);
				if (authorBookIds.includes(recipe._id.valueOf())) {
					recipe = {...recipe, inBook: true};
				} else {
					recipe = {...recipe, inBook: false};
				}
				recipe = recipePresenter.presentWithCreator(recipe);
			} else {
				recipe = recipePresenter.presentWithCreator(recipe);
			}
			res.json(recipe);
		} catch (e) {
			next(e);
		}
	},
	getByQuery: async (req, res, next) => {
		try {
			const {recipes, count, page} = await recipeRepository.getByQuery(req.query);
			const {tokenInfo} = req;

			if (tokenInfo) {
				const {author} = tokenInfo;
				const authorBookIds = await bookRepository.getBookIdArray(author._id);
				const newRecipes = recipes.map(recipe => {
						if (authorBookIds.includes(recipe._id.valueOf())) {
							return {...recipe, inBook: true};
						} else {
							return {...recipe, inBook: false};
						}
					}
				);

				const presentRecipes = recipePresenter.presentManyWithCreator(newRecipes);
				res.json({recipes: presentRecipes, count, page});
			} else {
				const presentRecipes = recipePresenter.presentManyWithCreator(recipes);
				res.json({recipes: presentRecipes, count, page});
			}
		} catch (e) {
			next(e);
		}
	},
	getReviews: async (req, res, next) => {
		try {
			let reviews = await recipeRepository.getReviews(req.params.recipeId);
			reviews = reviewPresenter.presentMany(reviews);

			res.json(reviews);
		} catch (e) {
			next(e);
		}
	},
	moderate: async (req, res, next) => {
		try {
			const {recipeId} = req.params;

			await recipeRepository.setModerateStatus(recipeId, true);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	removeMedia: async (req, res, next) => {
		try {
			await galleryRepository.deleteOne(req.gallery._id);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	update: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {recipe, updateRecipe} = req;

			const [updatedRecipe, admins] = await Promise.all([
				recipeRepository.updateById(recipe._id, updateRecipe),
				authorRepository.getAdmins(),
				recipeRepository.setModerateStatus(recipe._id, false),
			]);

			for (const admin of admins) {
				emailService.sendEmail(admin.email, UPDATE_RECIPE_MODERATION, {
					userName: author.userName,
					recipeDetails: `${config.FRONTEND_URL}/recipes/${updatedRecipe._id}`
				});
			}

			res.status(200).json("updated");
		} catch (e) {
			next(e);
		}
	}
};
