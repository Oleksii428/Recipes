import {IMyRecipeInterface} from "./myRecipe.interface";

export interface IMyRecipes {
	recipes: IMyRecipeInterface[];
	page: string;
	count: number;
}
