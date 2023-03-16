const Joi = require("joi");

module.exports = {
	createRoleValidator: Joi.object({
		title: Joi.string().trim().lowercase().valid("admin", "user").required()
	})
};
