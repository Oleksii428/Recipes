const path = require("node:path");

const {stageRepository, mediaRepository} = require("../repositories");
const {fileHelper} = require("../helpers");
const {uploadFileTypes} = require("../enums");

module.exports = {
	create: async (req, res, next) => {
		try {
			const {files, stage} = req;

			const newStage = await stageRepository.create(stage);
			let newStageWithPhoto;

			if (files) {
				const {image} = files;

				const fileName = fileHelper.buildFileName(image.name, uploadFileTypes.STAGES, newStage.id);

				const newMedia = await mediaRepository.create({path: fileName});
				await image.mv(path.join(process.cwd(), "uploads", fileName));
				newStageWithPhoto = await stageRepository.addPhoto(newStage._id, newMedia._id);
			}

			res.status(201).json(files ? newStageWithPhoto : newStage);
		} catch (e) {
			next(e);
		}
	}
};
