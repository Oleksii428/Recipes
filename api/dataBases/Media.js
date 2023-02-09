const {model, Schema} = require("mongoose");

const MediaSchema = new Schema({
	path: {type: String, require: true}
}, {
	versionKey: false
});

module.exports = model("Media", MediaSchema);
