const present = (review) => {
	return {
		_id: review._id,
		text: review.text,
		rating: review.rating,
		photo: review.photo?.path ? review.photo.path : null,
		owner: {
			userName: review.owner.userName,
			avatar: review.owner.avatar?.path ? review.owner.avatar?.path : null
		},
		createdAt: review.createdAt
	};
};

const presentMany = (reviews) => reviews.map(review => present(review));

module.exports = {
	present,
	presentMany
};
