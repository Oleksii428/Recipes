const {Author} = require("../dataBases");

module.exports = {
	addRecipeToBook: async (authorId, recipeId) => {
		await Author.findByIdAndUpdate(authorId, {$push: {"book": recipeId}});
	},
	create: (newAuthor) => Author.create(newAuthor),
	deleteById: (authorId) => Author.deleteOne({_id: authorId}),
	getAdmins: () => {
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
		const {block} = await Author.findById(id).select("block -_id").lean();
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
	getBlockedAuthors: () => Author.find({block: {$ne: ""}}),
	getLikes: (id) => Author.findById(id).select("likes -_id"),
	getListByParams: async (query) => {
		const {page = "1", name, sort = "totalLikes"} = query;
		const limit = 5;
		let findObj = {};

		if (name) {
			findObj = {
				userName: new RegExp(name)
			};
		}
		const authors = await Author.find(findObj).limit(limit).skip((page - 1) * limit).populate("role avatar recipes").sort({[sort]: -1}).lean();

		const count = await Author.count(findObj);
		return {
			authors,
			page,
			count
		};
	},
	getOneByParams: (filter) => Author.findOne(filter),
	getRoleOfAuthor: async (authorId) => {
		const {role} = await Author.findById(authorId).populate("role").lean();
		return role;
	},
	getSubscribers: async (id) => {
		const {subscribers} = await Author.findById(id).populate({
			path: "subscribers",
			populate: {path: "avatar"}
		}).select("subscribers").lean();
		return subscribers;
	},
	getSubscribersId: (id) => Author.findById(id).select("subscribers -_id").lean(),
	like: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$push: {"likes": fromId}});
	},
	removeRecipeFromBook: async (authorId, recipeId) => {
		await Author.findByIdAndUpdate(authorId, {$pull: {"book": recipeId}});
	},
	setAvatar: (authorId, avatar) => Author.findByIdAndUpdate(authorId, {$set: {"avatar": avatar}}),
	setBlock: (authorId, date) => Author.findByIdAndUpdate(authorId, {$set: {"block": date}}),
	subscribe: async (subscriberId, authorId) => {
		await Promise.all([
			Author.findByIdAndUpdate(authorId, {$push: {"subscribers": subscriberId}}),
			Author.findByIdAndUpdate(subscriberId, {$push: {"subscriptions": authorId}})
		]);
	},
	unLike: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$pull: {"likes": fromId}});
	},
	unSubscribe: async (subscriberId, authorId) => {
		await Promise.all([
			Author.findByIdAndUpdate(authorId, {$pull: {"subscribers": subscriberId}}),
			Author.findByIdAndUpdate(subscriberId, {$pull: {"subscriptions": authorId}})
		]);
	},
	unlock: (authorId) => Author.findByIdAndUpdate(authorId, {$set: {"block": ""}}),
	updateById: (id, payload) => Author.findByIdAndUpdate(id, payload, {new: true}).lean()
};
