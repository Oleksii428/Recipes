const {ApiError} = require("../errors");
const {stageValidator} = require("../validators");
const {stageRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: (req, res, next) => {
		try {
			const validatedBody = stageValidator.createStageValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.stage = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isExistsMany: async (req, res, next) => {
		try {
			const {stages} = req.recipe;

			for (const stage of stages) {
				const findStage = await stageRepository.findOne({_id: stage});
				if (!findStage) {
					throw new ApiError(`stage ${stage} not found`);
				}
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
