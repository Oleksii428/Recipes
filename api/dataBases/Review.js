const {model, Schema} = require("mongoose");

const ReviewSchema = new Schema({
	text: {type: String, require: true},
	rating: {type: Number, require: true},
	photo: {type: Schema.Types.ObjectId, ref: "Media", default: null},
	owner: {type: Schema.Types.ObjectId, ref: "Author"},
	recipe: {type: Schema.Types.ObjectId, ref: "Recipe"}
}, {
	timestamps: true
});

module.exports = model("Review", ReviewSchema);
