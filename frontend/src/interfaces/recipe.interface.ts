export interface IRecipe {
	_id: string,
	title: string,
	time: number,
	servings: number,
	description: string,
	category: string,
	kitchen: string,
	ingredients: string[],
	gallery: [
		{
			_id: string,
			path: string
		}
	],
	creator: {
		_id: string,
		userName: string,
		avatar: string
	},
	stages: [
		{
			_id: string,
			number: number,
			photo: string,
			description: string
		}
	],
	rating: number,
	bookCount: number,
	reviewsCount: number,
	createdAt: string
}
