const {model, Schema} = require("mongoose");

const CommentSchema = new Schema({
	text: {type: String, require: true},
	owner: {type: Schema.Types.ObjectId, ref: "Author"}
}, {
	timestamps: true
});

module.exports = model("Comment", CommentSchema);
