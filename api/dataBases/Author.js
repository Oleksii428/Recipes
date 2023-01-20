const {model, Schema} = require("mongoose");

const AuthorSchema = new Schema({
	userName: {type: String, trim: true, require: true, unique: true},
	email: {type: String, require: true, unique: true, lowercase: true},
	password: {type: String},
	avatar: {type: String},
	role: {type: Schema.Types.ObjectId, ref: "Role"},
	likes: [{type: Schema.Types.ObjectId, ref: "Author"}],
	dislikes: [{type: Schema.Types.ObjectId, ref: "Author"}],
	recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
	book: {type: Schema.Types.ObjectId, ref: "Recipe"}
}, {
	timestamps: true
});

module.exports = model("Author", AuthorSchema);
