const {Schema} = require("mongoose");
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
		likes: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		subscriptions: Joi.array().items(Joi.string().regex(regex.MONGO_ID).optional().default([])),
		subscribers: Joi.array().items(Joi.string().regex(regex.MONGO_ID).optional().default([])),
		recipes: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		book: Joi.array().items(Joi.string().regex(regex.MONGO_ID)).optional().default([]),
		block: Joi.string().isoDate().default("")
	}),
	userNameValidator: Joi.object({
		userName: Joi.string().regex(regex.USERNAME).trim().required()
	})
};
