const {model, Schema} = require("mongoose");

const LikeSchema = new Schema({
	from_whom: {type: Schema.Types.ObjectId, ref: "Author", require: true},
	to_whom: {type: Schema.Types.ObjectId, ref: "Author", require: true}
}, {
	versionKey: false
});

module.exports = model("Like", LikeSchema);
