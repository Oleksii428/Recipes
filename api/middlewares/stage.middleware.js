const {ApiError} = require("../errors");
const {stageValidator} = require("../validators");

module.exports = {
	isBodyCreateValid: (req, res, next) => {
		try {
			const stageInfo = req.body;
			const validatedBody = stageValidator.createStageValidator.validate({
				...stageInfo,
				recipe: req.recipe.id
			});

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.stage = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	}
};
