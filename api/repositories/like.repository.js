const {Like} = require("../dataBases");

module.exports = {
	create: (from_whom, to_whom) => Like.create({from_whom, to_whom}),
	delete: (from_whom, to_whom) => Like.deleteOne({from_whom, to_whom}),
	findOne: (from_whom, to_whom) => Like.findOne({from_whom, to_whom}),
	isLikedAdnCount: async (from_whom, to_whom) => {
		const [like, count] = await Promise.all([
			Like.findOne({from_whom, to_whom}).lean(),
			Like.count({to_whom})
		]);
		return [like, count];
	},
	getAuthorLikes: async (authorId) => {
		const likes = await Like.find({from_whom: authorId}).select("-_id").lean();
		return likes.map(like => like.to_whom.valueOf());
	}
};
