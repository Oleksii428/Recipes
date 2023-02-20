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
		gallery: recipe.gallery.map(media => media.media),
		stages: recipe.stages.map(stage => {
			return {
				_id: stage._id,
				number: stage.number,
				photo: stage.photo?.path ? stage.photo?.path : null,
				description: stage.description
			};
		}),
		rating: recipe.rating,
		bookCount: recipe.bookCount,
		reviewsCount: recipe.reviewsCount,
		createdAt: recipe.createdAt,
	};
};

const presentWithCreator = (recipe) => {
	return {
		_id: recipe._id,
		title: recipe.title,
		time: recipe.time,
		servings: recipe.servings,
		description: recipe.description,
		category: recipe.category.title,
		kitchen: recipe.kitchen.title,
		ingredients: recipe.ingredients,
		gallery: recipe.gallery.map(item => item.media),
		creator: {
			_id: recipe.creator._id,
			userName: recipe.creator.userName,
			avatar: recipe.creator.avatar?.path ? recipe.creator.avatar?.path : null
		},
		stages: recipe.stages.map(stage => {
			return {
				_id: stage._id,
				number: stage.number,
				photo: stage.photo?.path ? stage.photo?.path : null,
				description: stage.description
			};
		}),
		rating: recipe.rating,
		bookCount: recipe.bookCount,
		reviewsCount: recipe.reviewsCount,
		createdAt: recipe.createdAt,
	};
};

const presentMany = (recipes) => recipes.map(recipe => present(recipe));
const presentManyWithCreator = (recipes) => recipes.map(recipe => presentWithCreator(recipe));

module.exports = {
	present,
	presentMany,
	presentWithCreator,
	presentManyWithCreator
};
