import {AxiosRes, axiosService} from "./axios.servise";

import {IAuthors, IAuthorsQuery, IRecipes, IRecipesQuery} from "../interfaces";
import {urls} from "../configs";

const authorService = {
	getByQuery: (query: IAuthorsQuery | null): AxiosRes<IAuthors> => axiosService.get(urls.authors, {params: query}),
	getRecipesOfAuthor: (id: string, query: IRecipesQuery | null): AxiosRes<IRecipes> => axiosService.get(`${urls.authors}${id}/${urls.recipes}`, {params: query})
};

export {
	authorService
};
