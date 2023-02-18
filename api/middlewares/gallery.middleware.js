const {ApiError} = require("../errors");
const {galleryRepository} = require("../repositories");

module.exports = {
	isExists: async (req, res, next) => {
		try {
			const {mediaId} = req.params;
			const findGallery = await galleryRepository.findOne(req.recipe._id, mediaId);

			if (!findGallery) {
				throw new ApiError(`media ${mediaId} not found in gallery`, 400);
			}

			req.gallery = findGallery;
			next();
		} catch (e) {
			next(e);
		}
	}
};
