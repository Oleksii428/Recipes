const {model, Schema} = require("mongoose");

const MenuSchema = new Schema({
	title: {type: String, trim: true, require: true, unique: true, lowercase: true},
});

module.exports = model("Menu", MenuSchema);
