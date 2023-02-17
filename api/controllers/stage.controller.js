const path = require("node:path");

const {stageRepository, mediaRepository} = require("../repositories");
const {fileHelper} = require("../helpers");
const {uploadFileTypes} = require("../enums");

module.exports = {
	create: async (req, res, next) => {
		try {
			const {files, stage} = req;

			const newStage = await stageRepository.create(stage);

			if (files) {
				const {image} = files;

				const fileName = fileHelper.buildFileName(image.name, uploadFileTypes.STAGES, newStage.id);

				const [newMedia] = await Promise.all([
					mediaRepository.create({path: fileName}),
					image.mv(path.join(process.cwd(), "uploads", fileName))
				]);

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
				const {image} = files;

				const fileName = fileHelper.buildFileName(image.name, uploadFileTypes.STAGES, stage._id);

				const [newMedia] = await Promise.all([
					mediaRepository.create({path: fileName}),
					image.mv(path.join(process.cwd(), "uploads", fileName))
				]);

				await stageRepository.addPhoto(stage._id, newMedia._id);
			}

			res.status(200).json("updated");
		} catch (e) {
			next(e);
		}
	}
};
