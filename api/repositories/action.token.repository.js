const {ActionToken} = require("../dataBases");

module.exports = {
	create: async (newToken = {}) => ActionToken.create(newToken), findOne: async (filter = {}) => {
		return ActionToken.findOne(filter);
	},
	deleteOne: async (filter = {}) => ActionToken.deleteOne(filter)
};
