const {Role} = require("../dataBases");

module.exports = {
	getRoleId: async (title = "user") => {
		const role = await Role.findOne({title});
		return role._id.valueOf();
	}
};
