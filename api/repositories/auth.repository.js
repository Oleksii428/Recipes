const {Auth} = require("../dataBases");

module.exports = {
	create: (tokenPair, authorId) => Auth.create({...tokenPair, author: authorId}),
	deleteOne: (filter) => Auth.deleteOne(filter),
	findOne: (filter = {}) => Auth.findOne(filter).lean(),
	findOneWidthAuthor: (filter = {}) => Auth.findOne(filter).populate("author")
};
