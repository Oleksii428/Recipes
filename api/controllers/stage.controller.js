const {stageRepository} = require("../repositories");

module.exports = {
	create: async (req, res, next) => {
		try {
			const newStage = await stageRepository.create(req.stage);

			res.status(201).json(newStage);
		} catch (e) {
			next(e);
		}
	}
};
