const {ApiError} = require("../errors");
const {stageValidator} = require("../validators");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const categoryInfo = req.body;

			const validatedBody = stageValidator.createStageValidator.validate(req.body);

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
