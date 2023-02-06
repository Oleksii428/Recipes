const {ApiError} = require("../errors");
const {stageValidator} = require("../validators");
const {fileUploadConfig} = require("../configs");
const {stageRepository} = require("../repositories");

module.exports = {
	checkPhoto: async (req, res, next) => {
		try {
			if (req.files) {
				const imagesToUpload = Object.values(req.files);

				if (imagesToUpload.length > 1) {
					throw new ApiError("for each stage only one photo");
				}

				const image = imagesToUpload[0];
				const {size, mimetype, name} = image;

				if (size > fileUploadConfig.IMAGE_MAX_SIZE) {
					throw new ApiError(`file ${name} too big`, 400);
				}

				if (!fileUploadConfig.IMAGE_MIMETYPES.includes(mimetype)) {
					throw new ApiError(`file ${name} has invalid format`, 400);
				}
				req.photo = image;
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyCreateValid: async (req, res, next) => {
		try {
			const stageInfo = JSON.parse(req.body.stage);
			const validatedBody = stageValidator.createStageValidator.validate(stageInfo);

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
