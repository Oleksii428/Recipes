const {stageRepository, mediaRepository} = require("../repositories");
const {fileHelper} = require("../helpers");
const {uploadFileTypes} = require("../enums");
const path = require("node:path");

module.exports = {
	create: async (req, res, next) => {
		try {
			const stage = req.stage;

			const newStage = await stageRepository.create(req.stage);
			let newStageWithPhoto;

			if (req.files) {
				const {image} = req.files;

				const fileName = fileHelper.buildFileName(image.name, uploadFileTypes.STAGES, newStage.id);

				const newMedia = await mediaRepository.create({path: fileName});
				await image.mv(path.join(process.cwd(), "uploads", fileName));
				newStageWithPhoto = await stageRepository.addPhoto(newStage._id, newMedia._id);
			}

			res.status(201).json(req.files ? newStageWithPhoto : newStage);
		} catch (e) {
			next(e);
		}
	}
};
