const {model, Schema} = require("mongoose");

const RecipeSchema = new Schema({
	title: {type: String, trim: true, require: true},
	time: {type: Number, require: true},
	servings: {type: Number, require: true},
	description: {type: String, require: true},
	category: {type: Schema.Types.ObjectId, ref: "Category", require: true},
	kitchen: {type: Schema.Types.ObjectId, ref: "Kitchen", require: true},
	ingredients: [{type: String, require: true}],
	gallery: [{type: Schema.Types.ObjectId, ref: "Media"}],
	rating: {type: Number, default: 0},
	bookCount: {type: Number, default: 0},
	// reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
	creator: {type: Schema.Types.ObjectId, ref: "Author"},
	isModerated: {type: Boolean, default: false}
}, {
	timestamps: true,
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});

RecipeSchema.virtual("stages", {
	ref: "Stage",
	localField: "_id",
	foreignField: "recipe"
});

RecipeSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "recipe"
});

RecipeSchema.virtual("reviewsCount", {
	ref: "Review",
	localField: "_id",
	foreignField: "recipe",
	count: true
});

module.exports = model("Recipe", RecipeSchema);
