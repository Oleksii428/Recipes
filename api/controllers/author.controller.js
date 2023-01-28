const {authorRepository} = require("../repositories");
const {authService, emailService} = require("../services");
const {emailActions} = require("../enums");

module.exports = {
	getAll: async (req, res, next) => {
		try {
			const authors = await authorRepository.getByParams({});
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
	}
	// delete: async (req, res, next) => {
	// 	try {
	// 		const {authorId} = req.params;
	// 		await authorRepository.deleteById(authorId);
	// 		res.sendStatus(204);
	// 	} catch (e) {
	// 		next(e);
	// 	}
	// }
};
