const present = (author) => {
	return {
		userName: author.userName,
		email: author.email,
		createdAt: author.createdAt
	};
};

const presentMany = (authors) => {
	return authors.map(author => present(author));
};

module.exports = {
	present,
	presentMany
};
