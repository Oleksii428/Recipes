const {Kitchen} = require("../dataBases");

module.exports = {
	create: (newKitchen) => Kitchen.create(newKitchen),
	findOne: (filter = {}) => Kitchen.findOne(filter),
	getByParams: (query = {}) => {
		const {title} = query;
		let findObj = {};

		if (title) {
			findObj = {
				title: new RegExp(title)
			};
		}

		return Kitchen.find(findObj).sort("title");
	}
};
