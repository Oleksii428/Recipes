const present = (category) => {
	return {
		_id: category._id,
		title: category.title
	};
};

const presentMany = (categories) => categories.map(category => present(category));

module.exports = {
	present,
	presentMany
};
