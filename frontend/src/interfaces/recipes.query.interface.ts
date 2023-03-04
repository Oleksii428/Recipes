export interface IRecipesQuery {
	page?: string,
	title?: string,
	category?: string,
	kitchen?: string,
	ingredients?: string[],
	sort?: string,
	sortType?: string
}
