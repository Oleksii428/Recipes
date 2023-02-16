const {model, Schema} = require("mongoose");

const SubscriberSchema = new Schema({
	subscriber: {type: Schema.Types.ObjectId, ref: "Author", require: true},
	subscription: {type: Schema.Types.ObjectId, ref: "Author", require: true}
}, {
	versionKey: false
});

module.exports = model("Subscriber", SubscriberSchema);
