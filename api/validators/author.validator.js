const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	complainValidator: Joi.object({
		text: Joi.string().min(5).max(200).required()
	}),
	createAuthorValidator: Joi.object({
		userName: Joi.string().regex(regex.USERNAME).trim().required(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
		password: Joi.string().regex(regex.PASSWORD).required(),
		avatar: Joi.string().regex(regex.MONGO_ID).optional().default(null),
		role: Joi.string().regex(regex.MONGO_ID).required(),
		totalLikes: Joi.number().integer().default(0),
		block: Joi.string().isoDate().default(null)
	}),
	userNameValidator: Joi.object({
		userName: Joi.string().regex(regex.USERNAME).trim().required()
	})
};
