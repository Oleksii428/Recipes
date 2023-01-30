const {authorRepository} = require("../repositories");
const {authService, emailService} = require("../services");
const {emailActions} = require("../enums");
const {dateHelper} = require("../helpers");

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const authors = await authorRepository.getListByParams({});
			res.json(authors);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const {author} = req;

			const hashPassword = await authService.hashPassword(author.password);
			const newAuthor = await authorRepository.create({...author, password: hashPassword});
			await emailService.sendEmail(author.email, emailActions.WELCOME, {userName: author.userName});

			res.status(201).json(newAuthor);
		} catch (e) {
			next(e);
		}
	},
	block: async (req, res, next) => {
		try {
			const {author, date} = req;

			await authorRepository.setBlock(author.id, date);
			const prettyDate = await dateHelper.getPrettyDate(date);

			res.json(`author ${author.userName} has been baned until ${prettyDate}`);
		} catch (e) {
			next(e);
		}
	},
	changeUserName: async (req, res, next) => {
		try {
			const {userName} = req.body;
			const {author} = req.tokenInfo;

			await authorRepository.updateById(author._id, {userName});

			res.status(201).json(`userName has been changed to ${userName}`);
		} catch (e) {
			next(e);
		}
	}
};
