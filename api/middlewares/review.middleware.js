const {reviewValidator} = require("../validators");
const {ApiError} = require("../errors");
const {kitchenRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const reviewInfo = req.body;

			const validatedBody = reviewValidator.createReviewValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.review = {...validatedBody.value, owner: req.tokenInfo._id};
			next();
		} catch (e) {
			next(e);
		}
	}
};
