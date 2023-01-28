const {model, Schema} = require("mongoose");

const OAuthSchema = new Schema({
	accessToken: String,
	refreshToken: String,
	author: {type: Schema.Types.ObjectId, ref: "Author"}
}, {
	timestamps: true
});

module.exports = model("Auth", OAuthSchema);
