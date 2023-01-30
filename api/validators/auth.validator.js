const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createAuthValidator: Joi.object({
		userName: Joi.string().trim(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim(),
		password: Joi.string()
	}).xor("userName", "email"),
	createForgotValidator: Joi.object({
		userName: Joi.string().trim(),
		email: Joi.string().regex(regex.EMAIL).lowercase().trim()
	}).xor("userName", "email"),
	createPasswordValidator: Joi.object({
		password: Joi.string().regex(regex.PASSWORD).required()
	})
};
