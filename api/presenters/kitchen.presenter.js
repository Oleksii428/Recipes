const present = (kitchen) => {
	return {
		_id: kitchen._id,
		title: kitchen.title
	};
};

const presentMany = (kitchens) => kitchens.map(kitchen => present(kitchen));

module.exports = {
	present,
	presentMany
};
