const {Category} = require("../dataBases");

module.exports = {
	create: async (newCategory) => Category.create(newCategory),
	findOne: async (filter = {}) => Category.findOne(filter)
};
