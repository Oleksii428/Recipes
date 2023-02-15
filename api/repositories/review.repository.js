const {Review} = require("../dataBases");

module.exports = {
	addPhoto: (reviewId, mediaId) => Review.findByIdAndUpdate(reviewId, {$set: {"photo": mediaId}}, {new: true}),
	create: (newReview) => Review.create(newReview),
	getOneByParams: (filter = {}) => Review.findOne(filter)
};
