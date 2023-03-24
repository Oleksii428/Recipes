const {fileUploadConfig} = require("../configs");
const {ApiError} = require("../errors");
const {authorValidator, commonValidator,} = require("../validators");
const {
	authorRepository,
	roleRepository,
	likeRepository,
	subscriptionRepository
} = require("../repositories");
const {dateHelper} = require("../helpers");
const {authorRoles} = require("../enums");

module.exports = {
	checkBanStatus: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;

			const banStatus = await authorRepository.getBanStatus(author._id);

			if (banStatus) {
				throw new ApiError(`you are banned until ${banStatus}`, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	checkUploadImage: (req, res, next) => {
		try {
			if (!req.files) {
				throw new ApiError("no files to upload", 400);
			}

			const imagesToUpload = Object.values(req.files);

			for (const image of imagesToUpload) {
				const {size, mimetype, name} = image;

				if (size > fileUploadConfig.IMAGE_MAX_SIZE) {
					throw new ApiError(`file ${name} too big. Max size: ${fileUploadConfig.IMAGE_MAX_SIZE / 1024 / 1024}mb`, 400);
				}

				if (!fileUploadConfig.IMAGE_MIMETYPES.includes(mimetype)) {
					throw new ApiError(`file ${name} has invalid format`, 400);
				}
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isAdmin: async (req, res, next) => {
		try {
			const authorId = req.tokenInfo.author._id;
			const role = await authorRepository.getRoleOfAuthor(authorId);

			if (role.title !== authorRoles.ADMIN) {
				throw new ApiError("You are not an admin", 401);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
	isNotAdmin: async (req, res, next) => {
		try {
			const author = req.author;

			const adminRole = await roleRepository.getRoleId("admin");

			if (author.role.valueOf() === adminRole) {
				throw new ApiError(`author ${author.userName} already admin`, 400);
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
				const authorByEmail = await authorRepository.getOneByParamsWithPopulate({email});

				if (!authorByEmail) {
					throw new ApiError(`Wrong login or password`, 400);
				}
				req.author = authorByEmail;
				next();
			} else {
				const authorByUserName = await authorRepository.getOneByParamsWithPopulate({userName});

				if (!authorByUserName) {
					throw new ApiError(`Wrong login or password`, 400);
				}
				req.author = authorByUserName;
				next();
			}
		} catch (e) {
			next(e);
		}
	},
	isAuthorExistsDynamically: (fieldName, from = "body", dbField = fieldName) => async (req, res, next) => {
		try {
			const fieldToSearch = req[from][fieldName];

			const author = await authorRepository.getOneByParams({[dbField]: fieldToSearch});

			if (!author) {
				throw new ApiError(`author with ${dbField} ${fieldToSearch} not found`, 400);
			}

			req.author = author;
			next();
		} catch (e) {
			next(e);
		}
	},
	isBlockAuthorNotAdmin: async (req, res, next) => {
		try {
			const roleOfBlockAuthor = await authorRepository.getRoleOfAuthor(req.author._id);

			if (roleOfBlockAuthor.title === authorRoles.ADMIN) {
				throw new ApiError("you cant block admins", 400);
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
	isBodyComplainValid: (req, res, next) => {
		try {
			const complainText = req.body;

			const validatedComplain = authorValidator.complainValidator.validate(complainText);

			if (validatedComplain.error) {
				throw new ApiError(validatedComplain.error.message, 400);
			}

			req.complain = validatedComplain.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyCreateValid: async (req, res, next) => {
		try {
			const authorInfo = req.body;

			authorInfo.role = await roleRepository.getRoleId();

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
	isLiked: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			if (author.id === authorId) {
				throw new ApiError("you cant like yourself");
			}

			const like = await likeRepository.findOne(author._id, authorId);

			req.liked = !!like;

			next();
		} catch (e) {
			next(e);
		}
	},
	isSubscribed: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const {authorId} = req.params;

			if (author.id === authorId) {
				throw new ApiError("you cant subscribe to yourself");
			}

			const isSubscribed = await subscriptionRepository.findOne(author._id, authorId);

			req.subscribed = !!isSubscribed;

			next();
		} catch (e) {
			next(e);
		}
	},
	isUpdateUserNameValid: (req, res, next) => {
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
	makeAdmin: async (req, res, next) => {
		try {
			const author = req.author;

			const adminRoleId = await roleRepository.getRoleId("admin");
			await authorRepository.makeAdmin(author._id, adminRoleId);

			res.json(`author ${author.userName} is admin now`);
		} catch (e) {
			next(e);
		}
	}
};
