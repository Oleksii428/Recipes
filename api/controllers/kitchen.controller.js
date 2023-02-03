const {kitchenRepository} = require("../repositories");

module.exports = {
	create: async (req, res, next) => {
		try {
			const newKitchen = await kitchenRepository.create(req.kitchen);

			res.status(201).json(newKitchen);
		} catch (e) {
			next(e);
		}
	}
};
