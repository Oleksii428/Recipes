const {model, Schema} = require("mongoose");

const BookSchema = new Schema({
	recipe: {type: Schema.Types.ObjectId, ref: "Recipe", require: true},
	author: {type: Schema.Types.ObjectId, ref: "Author", require: true}
}, {
	versionKey: false
});

module.exports = model("Book", BookSchema);
