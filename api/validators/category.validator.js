const Joi = require("joi");

module.exports = {
	createCategoryValidator: Joi.object({
		title: Joi.string().trim().required().lowercase()
	})
};
