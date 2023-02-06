const {Review} = require("../dataBases");

module.exports = {
	addPhoto: async (reviewId, mediaId) => Review.findByIdAndUpdate(reviewId, {$set: {"photo": mediaId}}, {new: true}),
	create: async (newReview) => {
		return Review.create(newReview);
	},
	getOneByParams: async (filter = {}) => {
		return Review.findOne(filter);
	}
};
