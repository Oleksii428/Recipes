const {Subscription} = require("../dataBases");

module.exports = {
	create: (subscriber, subscription) => Subscription.create({subscriber, subscription}),
	delete: (subscriber, subscription) => Subscription.deleteOne({subscriber, subscription}),
	findOne: (subscriber, subscription) => Subscription.findOne({subscriber, subscription}).lean()
};
