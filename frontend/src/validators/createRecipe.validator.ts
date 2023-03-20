import Joi from "joi";

import {regexp} from "../configs";

const createRecipeValidator = Joi
	.object({
		title: Joi
			.string()
			.trim()
			.min(2)
			.max(40)
			.required()
			.lowercase()
			.messages({
				"string.base": "Title must be a string",
				"string.empty": "Title cannot be empty",
				"string.min": "Title must be at least {{#limit}} characters long",
				"string.max": "Title must be less than or equal to {{#limit}} characters long",
				"any.required": "Title is required"
			}),
		time: Joi
			.number()
			.integer()
			.min(1)
			.max(500)
			.required()
			.messages({
				"number.base": "Time must be a number",
				"number.empty": "Time cannot be empty",
				"number.integer": "Time must be an integer",
				"number.min": "Time must be at least {{#limit}} minutes",
				"number.max": "Time must be less than or equal to {{#limit}} minutes",
				"any.required": "Time is required"
			})
		,
		servings: Joi
			.number()
			.min(1)
			.max(50)
			.required()
			.messages({
				"number.base": "Servings must be a number",
				"number.empty": "Servings cannot be empty",
				"number.min": "Servings must be at least {{#limit}}",
				"number.max": "Servings must be less than or equal to {{#limit}}",
				"any.required": "Servings is required"
			}),
		description: Joi
			.string()
			.min(10)
			.max(1000)
			.required()
			.messages({
				"string.base": "Description must be a string",
				"string.empty": "Description cannot be empty",
				"string.min": "Description must be at least {{#limit}} characters long",
				"string.max": "Description must be less than or equal to {{#limit}} characters long",
				"any.required": "Description is required"
			}),
		category: Joi
			.string()
			.regex(regexp.MONGO_ID)
			.required()
			.messages({
				"string.base": "Category must be a string",
				"string.empty": "Category cannot be empty",
				"string.pattern.base": "Category must be a valid MongoDB ID",
				"any.required": "Category is required"
			}),
		kitchen: Joi
			.string()
			.regex(regexp.MONGO_ID)
			.required()
			.messages({
				"string.base": "Kitchen must be a string",
				"string.empty": "Kitchen cannot be empty",
				"string.pattern.base": "Kitchen must be a valid MongoDB ID",
				"any.required": "Kitchen is required"
			}),
		ingredients: Joi
			.array()
			.items(Joi
				.string()
				.min(3)
				.max(40))
			.min(1)
			.required()
			.messages({
				"array.base": "Ingredients must be an array",
				"array.empty": "Ingredients cannot be empty",
				"array.min": "Ingredients must have at least {{#limit}} item",
				"string.base": "Each ingredient must be a string",
				"string.min": "Each ingredient must be at least {{#limit}} characters long",
				"string.max": "Too long",
				"any.required": "Ingredients is required"
			})
	});

export {createRecipeValidator};
