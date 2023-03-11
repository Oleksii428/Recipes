import Joi from "joi";

const blockValidator = Joi.object({
	days: Joi
		.number()
		.integer()
		.min(1)
		.required()
		.messages({
			"number.empty": "Days is required",
			"any.required": "Days is required",
			"number.min": "Days must be greater than or equal to 1"
		})
});

export {blockValidator};
