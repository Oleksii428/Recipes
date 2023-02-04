const {recipeRepository, authorRepository, reviewRepository} = require("../repositories");
const {emailService} = require("../services");
const {
	CREATE_RECIPE_MODERATION,
	NEW_SUBSCRIBED_RECIPE,
	UPDATE_RECIPE_MODERATION
} = require("../enums/email.actions.enum");
const {config} = require("../configs");

module.exports = {
	getByQuery: async (req, res, next) => {
		try {
			const data = await recipeRepository.getByQuery(req.query);

			res.json(data);
		} catch (e) {
			next(e);
		}
	},
	getById: async (req, res, next) => {
		try {
			const recipe = await recipeRepository.getById(req.params.mongoId);

			res.json(recipe);
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
				authorRepository.getSubscribers(author._id)
			]);

			for (const admin of admins) {
				console.log("send moderation request");
				await emailService.sendEmail(admin.email, CREATE_RECIPE_MODERATION, {
					userName: author.userName,
					recipeDetails: `${config.FRONTEND_URL}/recipes/${createdRecipe._id}`
				});
			}
			if (subscribers) {
				for (const subscriber of subscribers) {
					console.log("send subscriber request");
					await emailService.sendEmail(subscriber.email, NEW_SUBSCRIBED_RECIPE, {
						userName: author.userName,
						recipeDetails: `${config.FRONTEND_URL}/recipes/${createdRecipe._id}`
					});
				}
			}

			res.sendStatus(201);
		} catch (e) {
			next(e);
		}
	},
	moderate: async (req, res, next) => {
		try {
			const {mongoId} = req.params;

			const recipe = await recipeRepository.moderate(mongoId, true);

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
				recipeRepository.moderate(recipe._id, false),
			]);

			for (const admin of admins) {
				console.log("send moderation request");
				await emailService.sendEmail(admin.email, UPDATE_RECIPE_MODERATION, {
					userName: author.userName,
					recipeDetails: `${config.FRONTEND_URL}/recipes/${updatedRecipe._id}`
				});
			}

			res.json("updated");
		} catch (e) {
			next(e);
		}
	},
	addReview: async (req, res, next) => {
		try {
			const recipe = req.recipe;

			const newReview = await reviewRepository.create(req.review);
			const updatedRecipe = await recipeRepository.addReview(recipe._id, newReview._id);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	}
};
