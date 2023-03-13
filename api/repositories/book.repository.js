const {Book} = require("../dataBases");

module.exports = {
	create: (recipeId, authorId) => Book.create({recipe: recipeId, author: authorId}),
	deleteOne: (recipeId, authorId) => Book.deleteOne({recipe: recipeId, author: authorId}),
	findOne: (recipeId, authorId) => Book
		.findOne({recipe: recipeId, author: authorId})
		.populate("recipe")
		.lean(),
	findByAuthorId: async (authorId, query) => {
		const {page = "1"} = query;
		const limit = 8;
		const skip = (page - 1) * limit;

		const [book, count] = await Promise.all([
			Book
				.find({author: authorId})
				.populate({
					path: "recipe",
					populate: {
						path: "category kitchen gallery stages reviewsCount bookCount",
						populate: {
							strictPopulate: false,
							path: "photo media",
							select: "path"
						}
					}
				})
				.transform(res => res.map(item => {
					return {...item.recipe, inBook: true};
				}))
				.sort({createdAt: -1})
				.skip(skip)
				.limit(limit)
				.lean(),
			Book.countDocuments({author: authorId})
		]);

		return {
			book,
			page,
			count
		};
	},
	getBookIdArray: async (authorId) => {
		const book = await Book.find({author: authorId}).select("-_id recipe").lean();
		return book.map(recipe => recipe.recipe.valueOf());
	}
};
