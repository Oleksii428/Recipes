const {ActionToken} = require("../dataBases");

module.exports = {
	create: (newToken = {}) => ActionToken.create(newToken),
	deleteOne: (filter = {}) => ActionToken.deleteOne(filter),
	findOne: (filter = {}) => ActionToken.findOne(filter)
};
