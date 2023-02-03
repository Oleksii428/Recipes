const {kitchenRepository} = require("../repositories");
const {kitchenPresenter} = require("../presenters");

module.exports = {
	getByQuery: async (req, res, next) => {
		try {
			const kitchens = await kitchenRepository.getByParams(req.query);

			const presentKitchens = kitchenPresenter.presentMany(kitchens);

			res.json(presentKitchens);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const newKitchen = await kitchenRepository.create(req.kitchen);

			res.status(201).json(newKitchen);
		} catch (e) {
			next(e);
		}
	}
};
