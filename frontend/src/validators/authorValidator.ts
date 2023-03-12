import Joi from "joi";
import {regexp} from "../configs";

const changeUserName = Joi.object({
	userName: Joi
		.string()
		.allow(null, "")
		.empty()
		.regex(regexp.USERNAME)
		.trim()
		.messages({
			"string.pattern.base": "Username must be between 8-20 characters and can only contain letters, numbers, periods, and underscores"
		}),
	avatar: Joi
		.optional()
});

export {changeUserName};
