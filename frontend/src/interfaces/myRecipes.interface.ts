import {IMyRecipe} from "./myRecipe.interface";

export interface IMyRecipes {
	recipes: IMyRecipe[];
	page: string;
	count: number;
}
