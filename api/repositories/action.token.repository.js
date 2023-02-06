const {ActionToken} = require("../dataBases");

module.exports = {
	create: async (newToken = {}) => ActionToken.create(newToken),
	deleteOne: async (filter = {}) => ActionToken.deleteOne(filter),
	findOne: async (filter = {}) => {
		return ActionToken.findOne(filter);
	}
};
