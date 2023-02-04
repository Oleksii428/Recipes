const {reviewRepository} = require("../repositories");
const {categoryPresenter} = require("../presenters");

module.exports = {
	create: async (req, res, next) => {
		try {
			const newReview = await reviewRepository.create(req.review);

			res.status(201).json();
		} catch (e) {
			next(e);
		}
	}
};
