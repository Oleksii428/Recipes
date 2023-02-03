const {ApiError} = require("../errors");
const {recipeValidator} = require("../validators");

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
	}
};
