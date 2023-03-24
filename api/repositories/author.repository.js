const {Author} = require("../dataBases");

module.exports = {
	create: (newAuthor) => Author.create(newAuthor),
	decTotalLikes: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$inc: {"totalLikes": -1}});
	},
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
	getBlockedAuthors: () => Author.find({block: {$ne: null}}).lean(),
	getById: (id) => Author.findById(id).populate("role avatar recipes totalBook totalSubscriptions totalSubscribers").lean(),
	getListByParams: async (query) => {
		const {page = "1", name, sort = "totalLikes"} = query;
		const limit = 8;
		let findObj = {};
		let sortObj = {[sort]: -1};

		if (name) {
			findObj.userName = new RegExp(name);
		}

		const [authors, count] = await Promise.all([
			Author
				.find(findObj)
				.limit(limit)
				.skip((page - 1) * limit)
				.populate("role avatar recipes totalBook totalSubscriptions totalSubscribers")
				.sort(sortObj)
				.lean(),
			Author.count(findObj)
		]);

		return {
			authors,
			page,
			count
		};
	},
	getOneByParams: (filter) => Author.findOne(filter),
	getOneByParamsWithPopulate: (filter) => Author.findOne(filter).populate("role avatar recipes totalBook totalSubscriptions totalSubscribers"),
	getRoleOfAuthor: async (authorId) => {
		const {role} = await Author.findById(authorId).populate("role").lean();
		return role;
	},
	incTotalLikes: async (fromId, toId) => {
		await Author.findByIdAndUpdate(toId, {$inc: {"totalLikes": 1}});
	},
	makeAdmin: (authorId, adminRoleId) => Author.findByIdAndUpdate(authorId, {$set: {"role": adminRoleId}}).lean(),
	setAvatar: (authorId, avatar) => Author.findByIdAndUpdate(authorId, {$set: {"avatar": avatar}}),
	setBlock: (authorId, date) => Author.findByIdAndUpdate(authorId, {$set: {"block": date}}),
	unlock: (authorId) => Author.findByIdAndUpdate(authorId, {$set: {"block": null}}),
	updateById: (id, payload) => Author.findByIdAndUpdate(id, payload, {new: true}).lean()
};
