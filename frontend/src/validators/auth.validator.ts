import Joi from "joi";

import {regexp} from "../configs";

const signUp = Joi.object({
	userName: Joi
		.string()
		.regex(regexp.USERNAME)
		.trim()
		.required()
		.messages({
			"string.pattern.base": "Username must be between 8-20 characters and can only contain letters, numbers, periods, and underscores",
			"string.empty": "Username is required",
			"any.required": "Username is required"
		}),
	email: Joi
		.string()
		.regex(regexp.EMAIL)
		.trim()
		.required()
		.messages({
			"string.pattern.base": "Please enter a valid email address",
			"string.empty": "Email is required",
			"any.required": "Email is required"
		}),
	password: Joi
		.string()
		.regex(regexp.PASSWORD)
		.required()
		.messages({
			"string.pattern.base": "Password must be at least 8 characters long and contain at least one letter and one number",
			"string.empty": "Password is required",
			"any.required": "Password is required"
		}),
	repeatPassword: Joi
		.string()
		.valid(Joi.ref("password"))
		.required()
		.messages({
			"any.only": "Passwords must match",
			"string.empty": "Please confirm your password",
			"any.required": "Please confirm your password"
		}),
	adminKey: Joi
		.string()
		.optional()
		.messages({
			"string.empty": "Admin Key is required",
			"any.required": "Admin Key is required"
		})
});

const restore = Joi.object({
	password: Joi
		.string()
		.regex(regexp.PASSWORD)
		.required()
		.messages({
			"string.pattern.base": "Password must be at least 8 characters long and contain at least one letter and one number",
			"string.empty": "Password is required",
			"any.required": "Password is required"
		}),
	repeatPassword: Joi
		.string()
		.valid(Joi.ref("password"))
		.required()
		.messages({
			"any.only": "Passwords must match",
			"string.empty": "Please confirm your password",
			"any.required": "Please confirm your password"
		})
});

export {signUp, restore};
