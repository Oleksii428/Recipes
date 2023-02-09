const {model, Schema} = require("mongoose");

const RoleSchema = new Schema({
	title: {type: String, lowercase: true, require: true, unique: true, default: "user"}
}, {
	versionKey: false
});

module.exports = model("Role", RoleSchema);
