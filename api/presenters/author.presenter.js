const present = (author) => {
	return {
		userName: author.userName,
		email: author.email,
		avatar: author.avatar,
		likes: author.likes,
		recipes: author.recipes,
		book: author.book,
		block: author.block,
		createdAt: author.createdAt,
		updatedAt: author.updatedAt,
	};
};

const presentMany = (authors) => {
	return authors.map(author => present(author));
};

module.exports = {
	present,
	presentMany
};
