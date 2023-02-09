const {model, Schema} = require("mongoose");

const ActionTokenSchema = new Schema({
	token: {type: String},
	tokenType: {type: String},
	author: {type: Schema.Types.ObjectId, ref: "Author"}
}, {
	timestamps: true,
	versionKey: false
});

module.exports = model("Action_Token", ActionTokenSchema);
