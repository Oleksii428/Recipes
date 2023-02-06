const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	blockDaysValidator: Joi.object({
		days: Joi.number().integer().min(1).required()
	}),
	idValidator: Joi.string().regex(regex.MONGO_ID)
};
