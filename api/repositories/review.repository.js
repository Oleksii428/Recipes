const {Review} = require("../dataBases");

module.exports = {
	create: async (newReview) => Review.create(newReview)
};
