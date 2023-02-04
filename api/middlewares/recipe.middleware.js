const {ApiError} = require("../errors");
const {recipeValidator} = require("../validators");
const {recipeRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const categoryInfo = req.body;

			const validatedBody = recipeValidator.createRecipeValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.recipe = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isModerated: async (req, res, next) => {
		try {
			const {mongoId} = req.params;

			const moderationStatus = await recipeRepository.getModerationStatus(mongoId);

			if (moderationStatus) {
				throw new ApiError("this recipe already moderated", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
