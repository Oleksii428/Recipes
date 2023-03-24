import {AxiosRes, axiosService} from "./axios.servise";

import {IAuthor, IAuthors, IAuthorsQuery, IRecipes, IRecipesQuery, ISubscribe} from "../interfaces";
import {urls} from "../configs";

const authorService = {
	getByQuery: (query: IAuthorsQuery | null): AxiosRes<IAuthors> => axiosService.get(urls.authors, {params: query}),
	getById: (id: string): AxiosRes<IAuthor> => axiosService.get(urls.getAuthorById(id)),
	getRecipesOfAuthor: (id: string, query: IRecipesQuery | null): AxiosRes<IRecipes> => axiosService.get(urls.getRecipesOfAuthor(id), {params: query}),
	likeToggle: (id: string): AxiosRes<void> => axiosService.patch(urls.likeToggle(id)),
	subscribeToggle: (id: string): AxiosRes<ISubscribe> => axiosService.patch(urls.subscribeToggle(id)),
	sendReport: (id: string, text: string): AxiosRes<void> => axiosService.patch(urls.reportAuthor(id), {text}),
	blockAuthor: (id: string, days: number): AxiosRes<void> => axiosService.patch(urls.blockAuthor(id), {days}),
	uploadAvatar: (avatar: File): AxiosRes<void> => axiosService.post(urls.uploadAvatar, {avatar}, {headers: {"Content-Type": "multipart/form-data"}}),
	changeUserName: (userName: string): AxiosRes<void> => axiosService.patch(urls.changeUserName, {userName}),
	makeAdmin: (id: string): AxiosRes<string> => axiosService.patch(urls.makeAdmin(id))
};

export {
	authorService
};
