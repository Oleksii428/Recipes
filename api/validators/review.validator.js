const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createReviewValidator: Joi.object({
		text: Joi.string().min(2).max(200).required(),
		rating: Joi.number().integer().min(1).max(5).required(),
		photo: Joi.string().regex(regex.MONGO_ID).optional().default(null),
		owner: Joi.string().regex(regex.MONGO_ID).required()
	})
};
