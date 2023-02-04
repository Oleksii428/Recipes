const {ApiError} = require("../errors");
const {recipeValidator} = require("../validators");
const {recipeRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
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
	isBodyUpdateValid: async (req, res, next) => {
		try {
			const validatedBody = recipeValidator.updateRecipeValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.updateRecipe = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isRecipeExistsDynamically: (fieldName, from = "body", dbField = fieldName) => async (req, res, next) => {
		try {
			const fieldToSearch = req[from][fieldName];

			const recipe = await recipeRepository.getOneByParams({[dbField]: fieldToSearch});

			if (!recipe) {
				throw new ApiError(`recipe width ${dbField} ${fieldToSearch} not found`, 400);
			}

			req.recipe = recipe;
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
	},
	checkCreator: async (req, res, next) => {
		try {
			const {recipe, tokenInfo} = req;

			const recipeWithCreator = await recipeRepository.getByIdWithAuthor(recipe._id);

			if (recipeWithCreator.creator.id !== tokenInfo.author.id) {
				throw new ApiError("you can edit only your own recipes", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
