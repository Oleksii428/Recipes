const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createStageValidator: Joi.object({
		number: Joi.number().min(1).max(30).required().default(1),
		photo: Joi.string().regex(regex.MONGO_ID),
		description: Joi.string().min(5).max(200).required()
	})
};
