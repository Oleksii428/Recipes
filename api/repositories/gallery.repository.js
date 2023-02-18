const {Gallery} = require("../dataBases");

module.exports = {
	create: (recipeId, mediaId) => Gallery.create({recipe: recipeId, media: mediaId}),
	deleteOne: (recipeId, mediaId) => Gallery.deleteOne({recipe: recipeId, author: mediaId})
};
