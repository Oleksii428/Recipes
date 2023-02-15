const {reviewRepository} = require("../repositories");

module.exports = {
	create: async (req, res, next) => {
		try {
			await reviewRepository.create(req.review);

			res.status(201).json();
		} catch (e) {
			next(e);
		}
	}
};
