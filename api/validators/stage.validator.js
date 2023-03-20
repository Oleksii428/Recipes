const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createStageValidator: Joi.object({
		recipe: Joi.string().regex(regex.MONGO_ID).required(),
		number: Joi.number().min(1).max(30).required().default(1),
		photo: Joi.string().regex(regex.MONGO_ID).optional().default(null),
		description: Joi.string().min(5).max(1000).required()
	})
};
