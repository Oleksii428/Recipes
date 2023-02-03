const {categoryRepository} = require("../repositories");
const {categoryPresenter} = require("../presenters");

module.exports = {
	getByQuery: async (req, res, next) => {
		try {
			const categories = await categoryRepository.getByParams(req.query);

			const presentCategories = categoryPresenter.presentMany(categories);

			res.json(presentCategories);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const newCategory = await categoryRepository.create(req.category);

			res.status(201).json(newCategory);
		} catch (e) {
			next(e);
		}
	}
};
