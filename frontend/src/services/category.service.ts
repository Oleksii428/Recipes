import {AxiosRes, axiosService} from "./axios.servise";

import {ICategory} from "../interfaces";
import {urls} from "../configs";

const categoryService = {
	getByParams: (): AxiosRes<ICategory[]> => axiosService.get(urls.categories)
};

export {
	categoryService
};
