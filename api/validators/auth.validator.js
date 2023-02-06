const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createAuthValidator: Joi.object({
		userName: Joi.string().trim(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim(),
		password: Joi.string()
	}).xor("userName", "email"),
	forgotValidator: Joi.object({
		userName: Joi.string().trim(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim()
	}).xor("userName", "email"),
	passwordValidator: Joi.object({
		password: Joi.string().regex(regex.PASSWORD).required()
	})
};
