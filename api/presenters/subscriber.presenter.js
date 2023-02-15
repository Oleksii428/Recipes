const present = (subscriber) => {
	return {
		_id: subscriber._id,
		userName: subscriber.userName,
		email: subscriber.email,
		avatar: subscriber.avatar?.path ? subscriber.avatar.path : null
	};
};

const presentMany = (subscribers) => subscribers.map(subscriber => present(subscriber));

module.exports = {
	present,
	presentMany
};
