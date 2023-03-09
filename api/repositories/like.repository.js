const {Like} = require("../dataBases");

module.exports = {
	create: (from_whom, to_whom) => Like.create({from_whom, to_whom}),
	delete: (from_whom, to_whom) => Like.deleteOne({from_whom, to_whom}),
	findOne: (from_whom, to_whom) => Like.findOne({from_whom, to_whom}),
	getAuthorLikes: async (authorId) => {
		const likes = await Like.find({from_whom: authorId}).select("-_id").lean();
		return likes.map(like => like.to_whom.valueOf());
	}
};
