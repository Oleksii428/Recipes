const {categoryRepository} = require("../repositories");
module.exports = {
	create: async (req, res, next) => {
		try {
			const newCategory = await categoryRepository.create(req.category);

			res.status(201).json(newCategory);
		} catch (e) {
			next(e);
		}
	}
};
