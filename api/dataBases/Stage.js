const {model, Schema} = require("mongoose");

const StageSchema = new Schema({
	recipe: {type: Schema.Types.ObjectId, ref: "Recipe"},
	number: {type: Number, require: true},
	photo: {type: Schema.Types.ObjectId, ref: "Media", default: null},
	description: {type: String, require: true}
}, {
	versionKey: false
});

module.exports = model("Stage", StageSchema);
