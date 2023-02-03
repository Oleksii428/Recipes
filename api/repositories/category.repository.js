const {Category} = require("../dataBases");

module.exports = {
	getByParams: async (query = {}) => {
		const {title} = query;
		let findObj = {};

		if (title) {
			findObj = {
				title: new RegExp(title)
			};
		}

		return Category.find(findObj).sort("title")
	},
	create: async (newCategory) => Category.create(newCategory),
	findOne: async (filter = {}) => Category.findOne(filter)
};
