const {Auth} = require("../dataBases");

module.exports = {
	findOne: async (filter = {}) => Auth.findOne(filter).lean(),
	findOneWidthAuthor: async (filter = {}) => {
		return Auth.findOne(filter).populate("author");
	},
	create: async (tokenPair, authorId) => {
		return Auth.create({...tokenPair, author: authorId});
	},
	deleteOne: async (filter) => Auth.deleteOne(filter)
};
