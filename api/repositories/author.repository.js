const {Author} = require("../dataBases");
const {subscriberPresenter} = require("../presenters");

module.exports = {
	addRecipe: async (authorId, recipeId) => {
		await Author.findByIdAndUpdate(authorId, {$push: {recipes: recipeId}});
	},
	addRecipeToBook: async (authorId, recipeId) => {
		await Author.findByIdAndUpdate(authorId, {$push: {"book": recipeId}});
	},
	create: async (newAuthor) => {
		return Author.create(newAuthor);
	},
	deleteById: async (authorId) => {
		return Author.deleteOne({_id: authorId});
	},
	getAdmins: async () => {
		return Author.aggregate([
			{
				$lookup: {
					from: "roles",
					localField: "role",
					foreignField: "_id",
					as: "role"
				}
			},
			{
				$unwind: "$role"
			},
			{
				$match: {
					"role.title": "admin"
				}
			}
		]);
	},
	getBanStatus: async (id) => {
		const {block} = await Author.findById(id).select("block -_id");
		return block;
	},
	getBlockedAuthors: async () => {
		return Author.find({block: {$ne: ""}});
	},
	getLikes: async (id) => {
		return Author.findById(id).select("likes -_id");
	},
	getListByParams: async (query) => {
		const {page = "1", name} = query;

		let findObj = {};

		if (name) {
			findObj = {
				...findObj,
				userName: new RegExp(name)
			};
		}

		const authors = await Author.find(findObj).limit(5).skip((+page - 1) * 5);
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
	getSubscribers: async (id) => {
		const author = await Author.findById(id).populate("subscribers").select("subscribers");
		return subscriberPresenter.presentMany(author.subscribers);
	},
	getSubscribersId: async (id) => {
		return Author.findById(id).select("subscribers -_id");
	},
	like: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$push: {"likes": fromId}});
	},
	removeRecipeFromBook: async (authorId, recipeId) => {
		await Author.findByIdAndUpdate(authorId, {$pull: {"book": recipeId}});
	},
	setAvatar: async (authorId, avatar) => {
		return Author.findByIdAndUpdate(authorId, {$set: {"avatar": avatar}});
	},
	setBlock: async (authorId, date) => {
		return Author.findByIdAndUpdate(authorId, {$set: {"block": date}});
	},
	subscribe: async (subscriberId, authorId) => {
		await Author.findByIdAndUpdate(authorId, {$push: {"subscribers": subscriberId}});
		await Author.findByIdAndUpdate(subscriberId, {$push: {"subscriptions": authorId}});
	},
	unLike: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$pull: {"likes": fromId}});
	},
	unSubscribe: async (subscriberId, authorId) => {
		await Author.findByIdAndUpdate(authorId, {$pull: {"subscribers": subscriberId}});
		await Author.findByIdAndUpdate(subscriberId, {$pull: {"subscriptions": authorId}});
	},
	unlock: async (authorId) => {
		return Author.findByIdAndUpdate(authorId, {$set: {"block": ""}});
	},
	updateById: async (id, payload) => Author.findByIdAndUpdate(id, payload, {new: true})
};
