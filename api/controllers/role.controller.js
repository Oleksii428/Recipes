const {roleRepository} = require("../repositories");
module.exports = {
	create: async (req, res, next) => {
		try {
			const newRole = req.body;
			console.log(newRole);
			await roleRepository.create(newRole);
			res.status(201).json(newRole);
		} catch (e) {
			next(e);
		}
	}
};
