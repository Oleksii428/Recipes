const {Recipe} = require("../dataBases");

module.exports = {
	create: (newRecipe) => Recipe.create(newRecipe),
	deleteById: (id) => Recipe.findByIdAndDelete(id).lean(),
	getById: (id) => Recipe.findById(id).populate({
		path: "category kitchen gallery creator reviewsCount stages bookCount",
		populate: {
			path: "media avatar photo",
			strictPopulate: false
		}
	}).lean(),
	getReviews: async (id) => {
		const {reviews} = await Recipe.findById(id).select("reviews").populate({
			path: "reviews",
			model: "Review",
			populate: {
				path: "photo owner",
				select: "-_id path userName avatar",
				populate: {
					path: "avatar",
					select: "-_id path",
					model: "Media",
					strictPopulate: false
				}
			}
		}).lean();
		return reviews;
	},
	getByQuery: async (query) => {
		const {page = "1", title, category, kitchen, ingredients, sort = "rating", sortType = "1"} = query;

		const limit = 5;
		let findObj = {};
		let sortObj = {
			[sort]: +sortType

		};
		let findByIngredients = [];

		if (title) {
			findObj = {
				...findObj,
				title: new RegExp(title)
			};
		}
		if (ingredients) {
			const findIngredients = ingredients.split(",");
			for (const findIngredient of findIngredients) {
				findByIngredients.push({ingredients: new RegExp(findIngredient)});
			}
			findObj = {
				...findObj,
				$and: findByIngredients
			};
		}

		let recipes = await Recipe.find({isModerated: true}).populate({
			path: "category kitchen creator reviewsCount gallery stages bookCount",
			populate: {
				path: "media avatar photo",
				strictPopulate: false
			}
		}).find(findObj).sort(sortObj).skip((+page - 1) * limit).limit(limit);

		if (category) {
			recipes = recipes.filter(recipe => recipe.category.title === category);
		}
		if (kitchen) {
			recipes = recipes.filter(recipe => recipe.kitchen.title === kitchen);
		}

		return {
			recipes,
			page,
			count: recipes.length
		};
	},
	getByAuthorId: (authorId) => Recipe.find({creator: authorId}).populate({
		path: "category kitchen reviewsCount gallery stages bookCount",
		populate: {
			path: "media photo",
			strictPopulate: false
		}
	}).lean(),
	getByAuthorIdWithCreator: async (authorId, query) => {
		const {page = "1"} = query;
		const limit = 5;

		const recipes = await Recipe.find({creator: authorId, isModerated: true}).populate({
			path: "category kitchen creator reviewsCount gallery stages bookCount",
			populate: {
				path: "media avatar photo",
				strictPopulate: false
			}
		}).skip((+page - 1) * limit).limit(limit).lean();
		const count = await Recipe.count({creator: authorId, isModerated: true});

		return {
			recipes,
			page,
			count
		};
	},
	getOneByParams: (filter = {}) => Recipe.findOne(filter),
	setModerateStatus: async (id, status) => {
		await Recipe.findByIdAndUpdate(id, {$set: {"isModerated": status}});
	},
	setBookCount: (id, number) => Recipe.findByIdAndUpdate(id, {$inc: {"bookCount": number}}),
	setRating: async (id) => {
		const {reviews} = await Recipe.findById(id).populate("reviews").select("reviews").lean();

		if (!reviews.length) {
			return Recipe.findByIdAndUpdate(id, {$set: {rating: 0}});
		} else {
			const oneStarReviews = reviews.filter(review => review.rating === 1).length;
			const twoStarReviews = reviews.filter(review => review.rating === 2).length;
			const threeStarReviews = reviews.filter(review => review.rating === 3).length;
			const fourStarReviews = reviews.filter(review => review.rating === 4).length;
			const fiveStarReviews = reviews.filter(review => review.rating === 5).length;
			const totalNumberOfRatings = oneStarReviews + twoStarReviews + threeStarReviews + fourStarReviews + fiveStarReviews;

			let averageRating = (1 * oneStarReviews + 2 * twoStarReviews + 3 * threeStarReviews + 4 * fourStarReviews + 5 * fiveStarReviews) / totalNumberOfRatings;
			averageRating = Math.round(averageRating * 10) / 10;

			return Recipe.findByIdAndUpdate(id, {$set: {rating: averageRating}});
		}
	},
	updateById: (id, updateRecipe) => {
		const {title, time, servings, description, ingredients} = updateRecipe;
		return Recipe.findByIdAndUpdate(id, {$set: {title, time, servings, description, ingredients}}, {new: true});
	}
};
