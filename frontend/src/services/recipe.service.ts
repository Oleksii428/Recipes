import {AxiosRes, axiosService} from "./axios.servise";

import {IRecipe, IRecipes} from "../interfaces";
import {urls} from "../configs";

const recipeService = {
	getByQuery: (): AxiosRes<IRecipes> => axiosService.get(urls.recipes),
	getById: (id: number): AxiosRes<IRecipe> => axiosService.get(`${urls.recipes}/${id}`)
};

export {
	recipeService
};
