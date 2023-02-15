const Joi = require("joi");

module.exports = {
	createKitchenValidator: Joi.object({
		title: Joi.string().trim().required().lowercase()
	})
};
