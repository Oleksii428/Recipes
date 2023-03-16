const {Role} = require("../dataBases");

module.exports = {
	create: (newRole) => Role.create(newRole),
	findOne: (title) => Role.findOne({title}),
	getRoleId: async (title = "user") => {
		const role = await Role.findOne({title});
		return role._id.valueOf();
	}
};
