const {model, Schema} = require("mongoose");

const KitchenSchema = new Schema({
	title: {type: String, trim: true, require: true, unique: true, lowercase: true},
}, {
	versionKey: false
});

module.exports = model("Kitchen", KitchenSchema);
