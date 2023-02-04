const {recipeRepository} = require("../repositories");

module.exports = {
	getByQuery: async (req, res, next) => {
		try {
			const data = await recipeRepository.getByQuery(req.query);

			res.json(data);
		} catch (e) {
			next(e);
		}
	},
	create: async (req, res, next) => {
		try {
			const {author} = req.tokenInfo;
			const newRecipe = req.recipe;

			await recipeRepository.create({...newRecipe, creator: author._id});

			res.sendStatus(201);
		} catch (e) {
			next(e);
		}
	}
};
