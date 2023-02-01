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
		const {role} = await Author.findById(authorId).populate("role");
		return role;
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
	},
	getBanStatus: async (id) => {
		const {block} = await Author.findById(id).select("block -_id");
		return block;
	},
	subscribe: async (subscriberId, authorId) => {
		await Author.findByIdAndUpdate(authorId, {$push: {"subscribers": subscriberId}});
		await Author.findByIdAndUpdate(subscriberId, {$push: {"subscriptions": authorId}});
	},
	unSubscribe: async (subscriberId, authorId) => {
		await Author.findByIdAndUpdate(authorId, {$pull: {"subscribers": subscriberId}});
		await Author.findByIdAndUpdate(subscriberId, {$pull: {"subscriptions": authorId}});
	},
	getSubscribers: async (id) => {
		return Author.findById(id).select("subscribers -_id");
	},
	getLikes: async (id) => {
		return Author.findById(id).select("likes -_id");
	},
	like: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$push: {"likes": fromId}});
	},
	unLike: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$pull: {"likes": fromId}});
	},
};
