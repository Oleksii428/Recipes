const {Recipe} = require("../dataBases");

module.exports = {
	create: async (newRecipe) => Recipe.create(newRecipe)
};
