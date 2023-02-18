const {Gallery} = require("../dataBases");

module.exports = {
	create: (recipeId, mediaId) => Gallery.create({recipe: recipeId, media: mediaId}),
	deleteOne: (galleryId) => Gallery.findByIdAndDelete(galleryId).lean(),
	findOne: (recipeId, mediaId) => Gallery.findOne({recipe: recipeId, media: mediaId}).lean()
};
