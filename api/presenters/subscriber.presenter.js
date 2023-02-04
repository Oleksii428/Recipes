const present = (subscriber) => {
	return {
		_id: subscriber._id,
		userName: subscriber.userName,
		email: subscriber.email
	};
};

const presentMany = (subscribers) => {
	return subscribers.map(subscriber => present(subscriber));
};

module.exports = {
	present,
	presentMany
};
