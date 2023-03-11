import Joi from "joi";

const reportValidator = Joi.object({
	text: Joi
		.string()
		.min(5)
		.max(200)
		.required()
		.messages({
			"string.empty": "Description is required",
			"any.required": "Description is required",
			"string.min": "Description must have at least 5 characters",
			"string.max": "Description be less than 200 characters"
		})
});

export {reportValidator};
