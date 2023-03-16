import {AxiosRes, axiosService} from "./axios.servise";

import {
	IRecipesQuery,
	IRecipe,
	IRecipes,
	IReview,
	ICreateReview,
	IMyRecipes,
	ICreateRecipe,
	ICreateStage
} from "../interfaces";
import {urls} from "../configs";

const recipeService = {
	getByQuery: (query: IRecipesQuery | null): AxiosRes<IRecipes> => axiosService.get(urls.recipes, {params: query}),
	getById: (id: string): AxiosRes<IRecipe> => axiosService.get(`${urls.recipes}/${id}/`),
	getReviews: (recipeId: string): AxiosRes<IReview[]> => axiosService.get(`${urls.recipes}${recipeId}/${urls.reviews}`),
	bookToggle: (recipeId: string): AxiosRes<void> => axiosService.patch(`${urls.recipes}${recipeId}/book-toggle`),
	createReview: (recipeId: string, review: ICreateReview): AxiosRes<void> => axiosService.post(urls.createReview(recipeId), {
		photo: review.photo,
		text: review.text,
		rating: review.rating
	}, {headers: {"Content-Type": "multipart/form-data"}}),
	deleteReview: (recipeId: string): AxiosRes<void> => axiosService.delete(urls.deleteReview(recipeId)),
	getMyRecipes: (page: string | null): AxiosRes<IMyRecipes> => axiosService.get(urls.getMyRecipes, {params: {page}}),
	getMyBook: (page: string | null): AxiosRes<IMyRecipes> => axiosService.get(urls.getMyBook, {params: {page}}),
	create: (newRecipeData: ICreateRecipe): AxiosRes<string> => axiosService.post(urls.recipes, newRecipeData),
	addPhoto: (recipeId: string, photo: File): AxiosRes<void> => axiosService.patch(
		urls.addPhotoToRecipe(recipeId),
		{photo},
		{headers: {"Content-Type": "multipart/form-data"}}
	),
	addVideo: (recipeId: string, video: File): AxiosRes<void> => axiosService.patch(
		urls.addVideoToRecipe(recipeId),
		{video},
		{headers: {"Content-Type": "multipart/form-data"}}
	),
	addStage: (recipeId: string, newStage: ICreateStage): AxiosRes<void> => axiosService.post(
		urls.addStageToRecipe(recipeId),
		newStage,
		{headers: {"Content-Type": "multipart/form-data"}}
	),
	getNotModerated: (page: string | null): AxiosRes<IRecipes> => axiosService.get(urls.getNotModeratedRecipes, {params: {page}}),
	moderate: (recipeId: string): AxiosRes<void> => axiosService.patch(urls.moderate(recipeId)),
	delete: (recipeId: string): AxiosRes<void> => axiosService.delete(urls.deleteRecipe(recipeId))
};

export {
	recipeService
};
