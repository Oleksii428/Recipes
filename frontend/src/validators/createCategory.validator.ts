import Joi from "joi";

const createCategoryValidator = Joi.object({
	title: Joi
		.string()
		.min(4)
		.max(200)
		.required()
		.messages({
			"string.empty": "Title is required",
			"string.min": "Title must be at least 20 characters long",
			"any.required": "Title is required"
		})
});

export {createCategoryValidator};
