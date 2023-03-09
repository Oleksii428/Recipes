import {AxiosRes, axiosService} from "./axios.servise";

import {IAuthor, IAuthors, IAuthorsQuery, ICheckLikes, IRecipes, IRecipesQuery} from "../interfaces";
import {urls} from "../configs";

const authorService = {
	getByQuery: (query: IAuthorsQuery | null): AxiosRes<IAuthors> => axiosService.get(urls.authors, {params: query}),
	getById: (id: string): AxiosRes<IAuthor> => axiosService.get(`${urls.authors}${id}/`),
	getRecipesOfAuthor: (id: string, query: IRecipesQuery | null): AxiosRes<IRecipes> => axiosService.get(`${urls.authors}${id}/${urls.recipes}`, {params: query}),
	likeToggle: (id: string): AxiosRes<void> => axiosService.patch(`${urls.authors}${id}/like-toggle`),
	checkLikes: (id: string): AxiosRes<ICheckLikes> => axiosService.get(urls.isAuthorLiked(id))
};

export {
	authorService
};
