const present = (review) => {
	return {
		_id: review._id,
		text: review.text,
		photo: review.photo.path,
		owner: {
			userName: review.owner.userName,
			avatar: review.owner.avatar.path
		},
		createdAt: review.createdAt
	};
};

const presentMany = (reviews) => {
	return reviews.map(review => present(review));
};

module.exports = {
	present,
	presentMany
};
