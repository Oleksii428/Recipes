const present = (recipe) => {
	return {
		_id: recipe._id,
		title: recipe.title,
		time: recipe.time,
		servings: recipe.servings,
		description: recipe.description,
		category: recipe.category.title,
		kitchen: recipe.kitchen.title,
		ingredients: recipe.ingredients,
		gallery: recipe.gallery.map(media => media.path),
		stages: recipe.stages.map(stage => {
			return {
				number: stage.number,
				photo: stage.photo,
				description: stage.description
			};
		}),
		rating: recipe.rating,
		bookCount: recipe.bookCount,
		reviewsCount: recipe.reviews.length,
		createdAt: recipe.createdAt,
	};
};

const presentMany = (recipes) => recipes.map(recipe => present(recipe));

module.exports = {
	present,
	presentMany
};
