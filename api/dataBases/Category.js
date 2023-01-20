const {model, Schema} = require("mongoose");

const CategorySchema = new Schema({
	title: {type: String, trim: true, require: true, unique: true, lowercase: true},
});

module.exports = model("Category", CategorySchema);
