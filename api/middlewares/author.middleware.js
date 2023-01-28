const {config} = require("../configs");
const {ApiError} = require("../errors");
const {authorValidator} = require("../validators");
const {authorRepository, roleRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const authorInfo = req.body;
			const {isAdmin} = req.query;

			if (isAdmin) {
				if (isAdmin === config.CREATE_ADMIN_KEY) {
					authorInfo.role = await roleRepository.getRoleId("admin");
				} else {
					throw new ApiError("Not valid admin key", 400);
				}
			} else {
				authorInfo.role = await roleRepository.getRoleId();
			}
			const validatedAuthor = authorValidator.createAuthorValidator.validate(authorInfo);

			if (validatedAuthor.error) {
				throw new ApiError(validatedAuthor.error.message, 400);
			}

			req.author = validatedAuthor.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isFieldUniqueDynamically: (field) => async (req, res, next) => {
		try {
			const searchValue = req.author[field];

			if (!searchValue) {
				throw new ApiError("userName is required", 400);
			}

			const author = await authorRepository.getOneByParams({[field]: searchValue});

			if (author) {
				throw new ApiError(`User with this ${field} already exists`, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isAuthorExistsByEmailOrUserName: async (req, res, next) => {
		try {
			const {email, userName} = req.body;

			if (email) {
				const authorByEmail = await authorRepository.getOneByParams({email});

				if (!authorByEmail) {
					throw new ApiError(`Author width email ${email} not found`, 400);
				}
				req.author = authorByEmail;
				next();
			} else {
				const authorByUserName = await authorRepository.getOneByParams({userName});

				if (!authorByUserName) {
					throw new ApiError(`Author width userName ${userName} not found`, 400);
				}
				req.author = authorByUserName;
				next();
			}
		} catch (e) {
			next(e);
		}
	}
};
