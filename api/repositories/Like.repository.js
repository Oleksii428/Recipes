const {Like} = require("../dataBases");

module.exports = {
	create: (from_whom, to_whom) => Like.create({from_whom, to_whom}),
	delete: (from_whom, to_whom) => Like.deleteOne({from_whom, to_whom}),
	findOne: (from_whom, to_whom) => Like.findOne({from_whom, to_whom})
};
