const {Kitchen} = require("../dataBases");

module.exports = {
	getByParams: async (query = {}) => {
		const {title} = query;
		let findObj = {};

		if (title) {
			findObj = {
				title: new RegExp(title)
			};
		}

		return Kitchen.find(findObj).sort("title");
	},
	create: async (newKitchen) => Kitchen.create(newKitchen),
	findOne: async (filter = {}) => Kitchen.findOne(filter)
};
