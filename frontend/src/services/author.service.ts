import {AxiosRes, axiosService} from "./axios.servise";

import {IAuthors, IAuthorsQuery} from "../interfaces";
import {urls} from "../configs";

const authorService = {
	getByQuery: (query: IAuthorsQuery | null): AxiosRes<IAuthors> => axiosService.get(urls.authors, {params: query})
};

export {
	authorService
};
