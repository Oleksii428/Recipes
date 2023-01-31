const Joi = require("joi");
const {regex} = require("../enums");

module.exports = {
	createAuthorValidator: Joi.object({
		userName: Joi.string().regex(regex.USERNAME).trim().required(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
		password: Joi.string().regex(regex.PASSWORD).required(),
		avatar: Joi.string().optional().default(""),
		role: Joi.string().regex(regex.MONGO_ID).required(),
		likes: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		recipes: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		book: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		block: Joi.string().isoDate().default("")
	}),
	userNameValidator: Joi.object({
		userName: Joi.string().regex(regex.USERNAME).trim().required()
	})
};
