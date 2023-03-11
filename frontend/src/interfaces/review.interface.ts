export interface IReview {
	_id: string;
	text: string;
	rating: number;
	photo: string | null;
	owner: {
		_id: string,
		userName: string,
		avatar: string | null
	};
	createdAt: string;
}
