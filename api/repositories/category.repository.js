const {Category} = require("../dataBases");

module.exports = {
	create: (newCategory) => Category.create(newCategory),
	findOne: (filter = {}) => Category.findOne(filter),
	getByParams: (query = {}) => {
		const {title} = query;
		let findObj = {};

		if (title) {
			findObj = {
				title: new RegExp(title)
			};
		}

		return Category.find(findObj).sort("title");
	}
};
