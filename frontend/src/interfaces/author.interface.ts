export interface IAuthor {
	_id: string,
	userName: string,
	email: string,
	avatar: string | null,
	role: string,
	recipes: number,
	totalLikes: number,
	isLiked?: boolean,
	totalSubscriptions: number,
	totalSubscribers: number,
	totalBook: number,
	block: string | null,
	createdAt: string
}
