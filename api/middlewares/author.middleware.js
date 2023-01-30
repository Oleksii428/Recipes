const {config} = require("../configs");
const {ApiError} = require("../errors");
const {authorValidator, commonValidator,} = require("../validators");
const {authorRepository, roleRepository} = require("../repositories");
const {dateHelper} = require("../helpers");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const authorInfo = req.body;
			const {isAdmin: adminKey} = req.query;

			if (adminKey) {
				if (adminKey === config.CREATE_ADMIN_KEY) {
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
	isAuthorExistsDynamically: (fieldName, from = "body", dbField = fieldName) => async (req, res, next) => {
		try {
			const fieldToSearch = req[from][fieldName];

			const author = await authorRepository.getOneByParams({[dbField]: fieldToSearch});

			if (!author) {
				throw new ApiError(`user width ${dbField} ${fieldToSearch} not found`, 400);
			}

			req.author = author;

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
	},
	isMongoIdValid: async (req, res, next) => {
		try {
			const {authorId} = req.params;

			const validatedId = commonValidator.idValidator.validate(authorId);

			if (validatedId.error) {
				throw new ApiError(validatedId.error.message, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isBlockTimeValid: async (req, res, next) => {
		try {
			const validatedTime = commonValidator.blockDaysValidator.validate(req.body);

			if (validatedTime.error) {
				throw new ApiError(validatedTime.error.message, 400);
			}
			const {days} = validatedTime.value;

			req.date = await dateHelper.getSomeDaysLaterIso(days);
			next();
		} catch (e) {
			next(e);
		}
	},
	isAdmin: async (req, res, next) => {
		try {
			const authorId = req.tokenInfo.author.id;
			const role = await authorRepository.getRoleOfAuthor(authorId);

			if (role.title !== "admin") {
				throw new ApiError("You are not an admin", 401);
			}

			next();
		} catch (e) {
			next(e);
		}
	}
};
