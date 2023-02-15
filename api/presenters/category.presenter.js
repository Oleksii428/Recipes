const present = (category) => {
	return {
		title: category.title
	};
};

const presentMany = (categories) => categories.map(category => present(category));

module.exports = {
	present,
	presentMany
};
