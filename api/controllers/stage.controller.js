const {stageRepository, mediaRepository} = require("../repositories");
const {uploadFileTypes} = require("../enums");
const {s3Service} = require("../services");

module.exports = {
	create: async (req, res, next) => {
		try {
			const {files, stage} = req;

			const newStage = await stageRepository.create(stage);

			if (files) {
				const uploadedData = await s3Service.uploadPublicFile(files.image, uploadFileTypes.STAGES, newStage.id);

				const newMedia = await mediaRepository.create({"path": uploadedData.Location});
				await stageRepository.addPhoto(newStage._id, newMedia._id);
			}

			res.sendStatus(201);
		} catch (e) {
			next(e);
		}
	},
	delete: async (req, res, next) => {
		try {
			await stageRepository.deleteById(req.stage._id);

			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	},
	update: async (req, res, next) => {
		try {
			const {files, stage, updateStage} = req;

			await stageRepository.update(stage._id, updateStage);

			if (files) {
				const uploadedData = await s3Service.uploadPublicFile(files.image, uploadFileTypes.STAGES, stage.id);

				const newMedia = await mediaRepository.create({"path": uploadedData.Location});
				await stageRepository.addPhoto(stage._id, newMedia._id);
			}

			res.status(200).json("updated");
		} catch (e) {
			next(e);
		}
	}
};
