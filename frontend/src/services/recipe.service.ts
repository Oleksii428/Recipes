import {AxiosRes, axiosService} from "./axios.servise";

import {IRecipesQuery, IRecipe, IRecipes, IReview} from "../interfaces";
import {urls} from "../configs";

const recipeService = {
	getByQuery: (query: IRecipesQuery | null): AxiosRes<IRecipes> => axiosService.get(urls.recipes, {params: query}),
	getById: (id: string): AxiosRes<IRecipe> => axiosService.get(`${urls.recipes}/${id}/`),
	getReviews: (recipeId: string): AxiosRes<IReview[]> => axiosService.get(`${urls.recipes}${recipeId}/${urls.reviews}`),
	bookToggle: (recipeId: string): AxiosRes<void> => axiosService.patch(`${urls.recipes}${recipeId}/book-toggle`)
};

export {
	recipeService
};
