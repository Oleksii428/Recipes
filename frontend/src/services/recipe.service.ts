import {AxiosRes, axiosService} from "./axios.servise";

import {IQuery, IRecipe, IRecipes} from "../interfaces";
import {urls} from "../configs";


const recipeService = {
	getByQuery: (query: IQuery | null): AxiosRes<IRecipes> => axiosService.get(urls.recipes, {params: query}),
	getById: (id: number): AxiosRes<IRecipe> => axiosService.get(`${urls.recipes}/${id}`)
};

export {
	recipeService
};
