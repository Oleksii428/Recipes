const {Author} = require("../dataBases");

module.exports = {
	getListByParams: async (query) => {
		const {page = 1, name} = query;

		let findObj = {};

		if (name) {
			findObj = {
				...findObj,
				userName: new RegExp(name)
			};
		}

		const authors = await Author.find(findObj).limit(5).skip((page - 1) * 5);
		return {
			authors,
			page
		};
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
		return Author.findByIdAndUpdate(authorId, {$set: {"block": ""}});
	},
	deleteById: async (authorId) => {
		return Author.deleteOne({_id: authorId});
	}
};
