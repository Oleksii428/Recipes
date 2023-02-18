const {model, Schema} = require("mongoose");

const GallerySchema = new Schema({
	recipe: {type: Schema.Types.ObjectId, ref: "Recipe", require: true},
	media: {type: Schema.Types.ObjectId, ref: "Media", require: true}
}, {
	versionKey: false
});

module.exports = model("Gallery", GallerySchema);
