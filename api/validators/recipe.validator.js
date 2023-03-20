const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createRecipeValidator: Joi.object({
		title: Joi.string().trim().min(2).max(40).required().lowercase(),
		time: Joi.number().integer().min(1).max(500).required(),
		servings: Joi.number().min(1).max(50).required(),
		description: Joi.string().min(10).max(1000).required(),
		category: Joi.string().regex(regex.MONGO_ID).required(),
		kitchen: Joi.string().regex(regex.MONGO_ID).required(),
		ingredients: Joi.array().items(Joi.string().min(3).max(40)).min(1).required(),
		rating: Joi.number().min(0).max(5).default(0),
		creator: Joi.string().regex(regex.MONGO_ID).optional(),
		isModerated: Joi.boolean().default(false)
	}),
	updateRecipeValidator: Joi.object({
		title: Joi.string().trim().lowercase().min(2).max(40).required(),
		time: Joi.number().min(1).max(500).required(),
		servings: Joi.number().min(1).max(50).required(),
		description: Joi.string().min(10).max(1000).required(),
		ingredients: Joi.array().items(Joi.string().min(3).max(40)).min(1).required(),
		isModerated: Joi.boolean().default(false)
	})
};
