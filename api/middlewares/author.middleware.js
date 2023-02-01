const {config} = require("../configs");
const {ApiError} = require("../errors");
const {authorValidator, commonValidator,} = require("../validators");
const {authorRepository, roleRepository} = require("../repositories");
const {dateHelper} = require("../helpers");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const authorInfo = req.body;
			const {adminKey} = req.query;

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
				throw new ApiError(`author width ${dbField} ${fieldToSearch} not found`, 400);
			}
			req.author = author;

			next();
		} catch (e) {
			next(e);
		}
	},
	isFieldUniqueDynamically: (field, from = "body", dbField = field) => async (req, res, next) => {
		try {
			const searchValue = req[from][field];

			const author = await authorRepository.getOneByParams({[dbField]: searchValue});

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
			const authorId = req.tokenInfo.author._id;
			const role = await authorRepository.getRoleOfAuthor(authorId);

			if (role.title !== "admin") {
				throw new ApiError("You are not an admin", 401);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isUpdateUserNameValid: async (req, res, next) => {
		try {
			const validatedUserName = authorValidator.userNameValidator.validate(req.body);

			if (validatedUserName.error) {
				throw new ApiError(validatedUserName.error.message, 400);
			}

			req.body.userName = validatedUserName.value.userName;
			next();
		} catch (e) {
			next(e);
		}
	},
	isBlockAuthorNotAdmin: async (req, res, next) => {
		try {
			const roleOfBlockAuthor = await authorRepository.getRoleOfAuthor(req.author._id);

			if (roleOfBlockAuthor.title === "admin") {
				throw new ApiError("you cant block admins", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	checkBanStatus: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;

			const banStatus = await authorRepository.getBanStatus(author._id);

			if (banStatus) {
				throw new ApiError("you are banned", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isSubscribed: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			const {subscribers} = await authorRepository.getSubscribers(authorId);

			if (author.id === authorId) {
				throw new ApiError("you cant subscribe to yourself");
			}

			if (subscribers.includes(author._id)) {
				throw new ApiError("you already subscribed to this author", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isUnSubscribed: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			const {subscribers} = await authorRepository.getSubscribers(authorId);

			if (!subscribers.includes(author._id)) {
				throw new ApiError("you are not subscribed to this author", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isLiked: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			const {likes} = await authorRepository.getLikes(authorId);

			if (author.id === authorId) {
				throw new ApiError("you cant like yourself");
			}

			if (likes.includes(author._id)) {
				throw new ApiError("you already liked this author", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isUnLiked: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			const {likes} = await authorRepository.getLikes(authorId);

			if (author.id === authorId) {
				throw new ApiError("you cant unlike yourself");
			}

			if (!likes.includes(author._id)) {
				throw new ApiError("you did not like this author", 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
};
