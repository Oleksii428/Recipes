const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createKitchenValidator: Joi.object({
		title: Joi.string().trim().required().lowercase()
	})
};
