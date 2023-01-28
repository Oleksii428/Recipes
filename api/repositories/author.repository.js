const {Author} = require("../dataBases");

module.exports = {
	getByParams: async (filter) => {
		return Author.find(filter).populate("role").lean();
	},
	getOneByParams: async (filter) => {
		return Author.findOne(filter);
	},
	create: async (newAuthor) => {
		return Author.create(newAuthor);
	},
	updateById: async (id, payload) => {
		return Author.findByIdAndUpdate(id, payload, {new: true});
	}
};
