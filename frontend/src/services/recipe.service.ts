import {AxiosRes, axiosService} from "./axios.servise";

import {IQuery, IRecipe, IRecipes, IReview} from "../interfaces";
import {urls} from "../configs";


const recipeService = {
	getByQuery: (query: IQuery | null): AxiosRes<IRecipes> => axiosService.get(urls.recipes, {params: query}),
	getById: (id: string): AxiosRes<IRecipe> => axiosService.get(`${urls.recipes}/${id}/`),
	getReviews: (recipeId: string): AxiosRes<IReview[]> => axiosService.get(`${urls.recipes}/${recipeId}/${urls.reviews}`)
};

export {
	recipeService
};
