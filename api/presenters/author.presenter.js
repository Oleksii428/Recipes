const present = (author) => {
	return {
		_id: author._id,
		userName: author.userName,
		email: author.email,
		avatar: author.avatar?.path ? author.avatar?.path : null,
		role: author.role.title,
		recipes: author.recipes,
		totalLikes: author.totalLikes,
		isLiked: author.isLiked,
		totalSubscriptions: author.totalSubscriptions,
		totalSubscribers: author.totalSubscribers,
		isSubscribed: author.isSubscribed,
		totalBook: author.totalBook,
		block: author.block,
		createdAt: author.createdAt
	};
};

const presentMany = (authors) => authors.map(author => present(author));

module.exports = {
	present,
	presentMany
};
