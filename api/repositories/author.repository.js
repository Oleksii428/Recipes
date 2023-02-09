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
	getBook: async (id) => {
		const {book} = await Author.findById(id).select("book -_id").populate({
			path: "book",
			populate: {
				path: "category kitchen gallery stages",
				select: "title number photo description",
				populate: {
					strictPopulate: false,
					path: "photo",
					select: "-_id path"
				}
			}
		});
		return book;
	},
	getBlockedAuthors: async () => {
		return Author.find({block: {$ne: ""}});
	},
	getLikes: async (id) => {
		return Author.findById(id).select("likes -_id");
	},
	getListByParams: async (query) => {
		const {page = "1", name} = query;

		const limit = 5;
		let findObj = {};

		if (name) {
			findObj = {
				userName: new RegExp(name)
			};
		}

		const authors = await Author.aggregate([
			{
				$match: findObj
			},
			{
				$limit: limit
			},
			{
				$skip: (+page - 1) * limit
			},
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
				$addFields: {
					totalLikes: {$size: "$likes"},
					totalSubscriptions: {$size: "$subscriptions"},
					totalSubscribers: {$size: "$subscribers"},
					totalRecipes: {$size: "$recipes"},
					totalBook: {$size: "$book"},
				}
			},
			{
				$project: {
					userName: 1,
					email: 1,
					avatar: 1,
					role: "$role.title",
					totalLikes: 1,
					totalSubscriptions: 1,
					totalSubscribers: 1,
					totalRecipes: 1,
					totalBook: 1,
					block: 1,
					createdAt: 1,
				}
			},
		]);

		const count = await Author.count(findObj);
		return {
			authors,
			page,
			count
		};
	},
	getOneByParams: async (filter) => {
		return Author.findOne(filter);
	},
	getRoleOfAuthor: async (authorId) => {
		const {role} = await Author.findById(authorId).populate("role").lean();
		return role;
	},
	getSubscribers: async (id) => {
		const author = await Author.findById(id).populate("subscribers").select("subscribers").lean();
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
