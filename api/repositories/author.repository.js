const {Author} = require("../dataBases");

module.exports = {
	getListByParams: async (filter) => {
		return Author.find(filter).lean();
	},
	getOneByParams: async (filter) => {
		return Author.findOne(filter);
	},
	getRoleOfAuthor: async (authorId) => {
		const author = await Author.findById(authorId).populate("role");
		return author.role;
	},
	create: async (newAuthor) => {
		return Author.create(newAuthor);
	},
	updateById: async (id, payload) => {
		return Author.findByIdAndUpdate(id, payload, {new: true});
	},
	setBlock: async (authorId, date) => {
		return Author.findByIdAndUpdate(authorId, {$set: {"block": date}});
	},
	getBlockedAuthors: async () => {
		return Author.find({block: {$ne: ""}});
	},
	unlock: async (authorId) => {
		console.log(authorId);
		return Author.findByIdAndUpdate(authorId, {$set: {"block": ""}});
	}
};
