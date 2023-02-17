const {Review} = require("../dataBases");

module.exports = {
	addPhoto: (reviewId, mediaId) => Review.findByIdAndUpdate(reviewId, {$set: {"photo": mediaId}}, {new: true}),
	create: (newReview) => Review.create(newReview),
	deleteById: (id) => Review.findByIdAndDelete(id).lean(),
	getOneByParams: (filter = {}) => Review.findOne(filter)
};
