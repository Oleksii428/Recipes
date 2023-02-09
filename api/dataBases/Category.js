const {model, Schema} = require("mongoose");

const CategorySchema = new Schema({
	title: {type: String, trim: true, require: true, unique: true, lowercase: true},
}, {
	versionKey: false
});

module.exports = model("Category", CategorySchema);
