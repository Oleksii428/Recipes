const present = (recipe) => {
	return {
		title: recipe.title,
		time: recipe.time,
		servings: recipe.servings,
		description: recipe.description,
		category: recipe.category.title,
		kitchen: recipe.kitchen.title,
		ingredients: recipe.ingredients,
		gallery: recipe.gallery,
		stages: recipe.stages.map(stage => {
			return {
				number: stage.number,
				photo: stage.photo.path,
				description: stage.description
			};
		}),
		rating: recipe.rating,
		bookCount: recipe.bookCount,
		createdAt: recipe.createdAt
	};
};

const presentMany = (book) => book.map(recipe => present(recipe));

module.exports = {
	present,
	presentMany
};
