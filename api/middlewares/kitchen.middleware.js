const {kitchenValidator} = require("../validators");
const {ApiError} = require("../errors");
const {kitchenRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const categoryInfo = req.body;

			const validatedBody = kitchenValidator.createKitchenValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.kitchen = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isUnique: async (req, res, next) => {
		try {
			const {title} = req.kitchen;

			const kitchenInDb = await kitchenRepository.findOne({title});

			if (kitchenInDb) {
				throw new ApiError(`kitchen ${title} already exists in data base`, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
