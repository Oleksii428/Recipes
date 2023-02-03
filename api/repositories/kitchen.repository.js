const {Kitchen} = require("../dataBases");

module.exports = {
	create: async (newKitchen) => Kitchen.create(newKitchen),
	findOne: async (filter = {}) => Kitchen.findOne(filter)
};
