const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createCategoryValidator: Joi.object({
		title: Joi.string().trim().required().lowercase()
	})
};
