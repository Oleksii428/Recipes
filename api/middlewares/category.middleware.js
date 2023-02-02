const {categoryValidator} = require("../validators");
const {ApiError} = require("../errors");
const {categoryRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const categoryInfo = req.body;

			const validatedBody = categoryValidator.createCategoryValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.category = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isUnique: async (req, res, next) => {
		try {
			const {title} = req.category;

			const categoryInDb = await categoryRepository.findOne({title});

			if (categoryInDb) {
				throw new ApiError(`category ${title} already exists in data base`, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
