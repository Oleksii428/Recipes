const {ApiError} = require("../errors");
const {stageValidator} = require("../validators");
const {stageRepository} = require("../repositories");

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
	},
	isBodyUpdateValid: (req, res, next) => {
		try {
			const stageInfo = req.body;
			const validatedBody = stageValidator.createStageValidator.validate({
				...stageInfo,
				recipe: req.stage.recipe.valueOf()
			});

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.updateStage = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isStageExists: async (req, res, next) => {
		try {
			const {stageId} = req.params;

			const stage = await stageRepository.findById(stageId);

			if (!stage) {
				throw new ApiError(`stage with id ${stageId} not found`, 400);
			}

			req.stage = stage;
			next();
		} catch (e) {
			next(e);
		}
	}
};
