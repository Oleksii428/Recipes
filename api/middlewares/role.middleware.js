const {roleValidator} = require("../validators");
const {ApiError} = require("../errors");
const {roleRepository} = require("../repositories");

module.exports = {
	isRoleCreateValid: (req, res, next) => {
		try {
			const validatedBody = roleValidator.createRoleValidator.validate(req.body);

			if (validatedBody.error) {
				throw new ApiError(validatedBody.error.message, 400);
			}

			req.role = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isUnique: async (req, res, next) => {
		try {
			const {title} = req.role;

			const roleInDb = await roleRepository.findOne(title);

			if (roleInDb) {
				throw new ApiError(`role ${title} already exists in data base`, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
