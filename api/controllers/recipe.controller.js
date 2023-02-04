const {recipeRepository, authorRepository} = require("../repositories");
const {emailService} = require("../services");
const {RECIPE_MODERATION, NEW_SUBSCRIBED_RECIPE} = require("../enums/email.actions.enum");
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
				await emailService.sendEmail(admin.email, RECIPE_MODERATION, {
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
	}
};
