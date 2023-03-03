export interface IReview {
	_id: string;
	text: string;
	rating: number;
	photo: string | null;
	owner: {
		userName: string,
		avatar: string | null
	};
	createdAt: string;
}
