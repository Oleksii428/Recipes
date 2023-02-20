import {IRecipe} from "./recipe.interface";

export interface IRecipes {
	recipes: IRecipe[],
	page: string,
	count: number
}
