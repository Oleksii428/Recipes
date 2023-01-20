const {model, Schema} = require("mongoose");

const MediaSchema = new Schema({
	path: {type: String, require: true}
});

module.exports = model("Media", MediaSchema);
