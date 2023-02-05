const {Review} = require("../dataBases");

module.exports = {
	create: async (newReview) => {
		return Review.create(newReview);
	},
	getOneByParams: async (filter = {}) => {
		return Review.findOne(filter);
	}
};
