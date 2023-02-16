const {Subscriber} = require("../dataBases");

module.exports = {
	create: (subscriber, subscription) => Subscriber.create({subscriber, subscription}),
	delete: (subscriber, subscription) => Subscriber.deleteOne({subscriber, subscription}),
	getSubscribers: (authorId) => Subscriber.find({subscription: authorId}).populate({path: "subscriber"}).transform(res => res.map(item => item.subscriber)).lean()
};
