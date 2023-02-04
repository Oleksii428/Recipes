const {model, Schema} = require("mongoose");

const StageSchema = new Schema({
	number: {type: Number, require: true},
	photo: {type: Schema.Types.ObjectId, ref: "Media", default: null},
	description: {type: String, require: true}
});

module.exports = model("Stage", StageSchema);
