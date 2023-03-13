const {Subscriber} = require("../dataBases");

module.exports = {
	create: (subscriber, subscription) => Subscriber.create({subscriber, subscription}),
	delete: (subscriber, subscription) => Subscriber.deleteOne({subscriber, subscription}),
	getSubscribers: (authorId) => Subscriber.find({subscription: authorId}).populate({path: "subscriber"}).transform(res => res.map(item => item.subscriber)).lean(),
	getSubscribersByQuery: async (authorId, query) => {
		const {page = "1"} = query;
		const limit = 8;
		const skip = (page - 1) * limit;

		const [subscribers, count] = await Promise.all([
			Subscriber
				.find({subscription: authorId})
				.populate({path: "subscriber"})
				.transform(res => res.map(item => item.subscriber))
				.sort({createdAt: -1})
				.skip(skip)
				.limit(limit)
				.lean(),
			Subscriber.countDocuments({subscription: authorId})
		]);

		return {
			subscribers,
			page,
			count
		};
	}
};
