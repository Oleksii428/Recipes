import Joi from "joi";

const createReviewValidator = Joi.object({
	text: Joi
		.string()
		.min(20)
		.max(200)
		.required()
		.messages({
			"string.empty": "Description is required",
			"string.min": "Description must be at least 20 characters long",
			"any.required": "Description is required"
		}),
	rating: Joi
		.number()
		.integer()
		.min(1)
		.max(5)
		.required()
		.messages({
			"number.empty": "Rating is required",
			"number.min": "Rating must be greater than or equal to 1",
			"number.max": "Rating must be less than or equal to 5",
			"any.required": "Rating is required"
		}),
	photo: Joi.optional()
});

export {createReviewValidator};
