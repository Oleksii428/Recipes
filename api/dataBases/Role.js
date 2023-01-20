const {model, Schema} = require("mongoose");

const RoleSchema = new Schema({
	title: {type: String, lowercase: true, require: true, unique: true, default: "user"}
});

module.exports = model("Role", RoleSchema);
