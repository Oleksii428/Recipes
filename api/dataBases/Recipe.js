const {model, Schema} = require("mongoose");

const RecipeSchema = new Schema({
	title: {type: String, trim: true, require: true},
	time: {type: Number, require: true},
	description: {type: String, require: true},
	category: {type: Schema.Types.ObjectId, ref: "Category", require: true},
	menu: {type: Schema.Types.ObjectId, ref: "Menu", require: true},
	kitchen: {type: Schema.Types.ObjectId, ref: "Kitchen", require: true},
	ingredients: [{type: Schema.Types.ObjectId, ref: "Ingredient", require: true}],
	gallery: [{type: Schema.Types.ObjectId, ref: "Media"}],
	stages: [{type: Schema.Types.ObjectId, ref: "Stage", require: true}],
	likes: [{type: Schema.Types.ObjectId, ref: "Author"}],
	dislikes: [{type: Schema.Types.ObjectId, ref: "Author"}],
	bookCount: {type: Number, default: 0},
	comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
	creator: {type: Schema.Types.ObjectId, ref: "Author"},
	isModerated: {type: Boolean, default: false}
}, {
	timestamps: true
});

module.exports = model("Recipe", RecipeSchema);
