const {model, Schema} = require("mongoose");

const {authService} = require("../services");

const AuthorSchema = new Schema({
	userName: {type: String, trim: true, require: true, unique: true},
	email: {type: String, require: true, unique: true, lowercase: true},
	password: String,
	avatar: {type: Schema.Types.ObjectId, ref: "Media", default: null},
	role: {type: Schema.Types.ObjectId, ref: "Role"},
	totalLikes: {type: Number, default: 0},
	subscriptions: [{type: Schema.Types.ObjectId, ref: "Author"}],
	subscribers: [{type: Schema.Types.ObjectId, ref: "Author"}],
	book: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
	block: {type: Date, default: ""}
}, {
	timestamps: true,
	toJSON: {virtuals: true},
	toObject: {virtuals: true}
});

AuthorSchema.virtual("recipes", {
	ref: "Recipe",
	localField: "_id",
	foreignField: "creator",
	count: true
});

AuthorSchema.methods = {
	async comparePasswords(password) {
		await authService.comparePasswords(this.password, password);
	}
};

module.exports = model("Author", AuthorSchema);
