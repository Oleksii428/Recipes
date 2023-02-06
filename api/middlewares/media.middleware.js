const {ApiError} = require("../errors");
const {fileUploadConfig} = require("../configs");

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
	checkPhotos: async (req, res, next) => {
		try {
			if (!req.files) {
				throw new ApiError("no files to upload", 400);
			}
			const imagesToUpload = Object.values(req.files);

			for (const photo of imagesToUpload) {
				const {size, mimetype, name} = photo;

				if (size > fileUploadConfig.IMAGE_MAX_SIZE) {
					throw new ApiError(`file ${name} too big`, 400);
				}

				if (!fileUploadConfig.IMAGE_MIMETYPES.includes(mimetype)) {
					throw new ApiError(`file ${name} has invalid format`, 400);
				}
			}

			next();
		} catch (e) {
			next(e);
		}
	},
}
;
