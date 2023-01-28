const {model, Schema} = require("mongoose");

const {authService} = require("../services");

const AuthorSchema = new Schema({
	userName: {type: String, trim: true, require: true, unique: true},
	email: {type: String, require: true, unique: true, lowercase: true},
	password: String,
	avatar: String,
	role: {type: Schema.Types.ObjectId, ref: "Role"},
	likes: [{type: Schema.Types.ObjectId, ref: "Author"}],
	dislikes: [{type: Schema.Types.ObjectId, ref: "Author"}],
	recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
	book: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
	block: {type: String, default: ""}
}, {
	timestamps: true
});

AuthorSchema.methods = {
	async comparePasswords(password) {
		await authService.comparePasswords(this.password, password);
	}
};

module.exports = model("Author", AuthorSchema);
