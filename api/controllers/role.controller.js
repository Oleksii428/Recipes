const {roleRepository} = require("../repositories");

module.exports = {
	create: async (req, res, next) => {
		try {
			const newRole = await roleRepository.create(req.role);

			res.status(201).json(newRole);
		} catch (e) {
			next(e);
		}
	}
};
