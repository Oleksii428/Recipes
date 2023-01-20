const {model, Schema} = require("mongoose");

const IngredientSchema = new Schema({
	title: {type: String, trim: true, unique: true, lowercase: true, require: true},
	count: {type: Number, default: null},
	weight: {type: Number, default: null},
	volume: {type: Number, default: null}
});

module.exports = model("Ingredient", IngredientSchema);
