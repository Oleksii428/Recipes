import Joi from "joi";

import {regexp} from "../configs";

const signUpValidator = Joi.object({
	userName: Joi.string().regex(regexp.USERNAME).trim().required(),
	password: Joi.string().regex(regexp.PASSWORD).required()
});

export {signUpValidator};
