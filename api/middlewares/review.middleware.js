const {reviewValidator} = require("../validators");
const {ApiError} = require("../errors");
const {reviewRepository, authorRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const reviewInfo = req.body;

			const validatedBody = reviewValidator.createReviewValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.review = {...validatedBody.value, owner: req.tokenInfo.author._id};
			next();
		} catch (e) {
			next(e);
		}
	},
	isReviewExistsDynamically: (fieldName, from = "body", dbField = fieldName) => async (req, res, next) => {
		try {
			const fieldToSearch = req[from][fieldName];

			const review = await reviewRepository.getOneByParams({[dbField]: fieldToSearch});

			if (!review) {
				throw new ApiError(`review width ${dbField} ${fieldToSearch} not found`, 400);
			}

			req.review = review;
			next();
		} catch (e) {
			next(e);
		}
	},
	checkOwner: async (req, res, next) => {
		try {
			const {review, tokenInfo} = req;
			const {author} = tokenInfo;

			const isOwner = author._id.equals(review.owner._id);
			const role = await authorRepository.getRoleOfAuthor(author._id);

			if (!isOwner && role.title !== "admin") {
				throw new ApiError("is review is not yours", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
