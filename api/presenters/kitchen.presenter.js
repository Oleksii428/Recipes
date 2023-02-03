const present = (kitchen) => {
	return {
		title: kitchen.title
	};
};

const presentMany = (kitchens) => {
	return kitchens.map(kitchen => present(kitchen));
};

module.exports = {
	present,
	presentMany
};
