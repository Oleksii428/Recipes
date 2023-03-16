import {AxiosRes, axiosService} from "./axios.servise";

import {ICategory, ICreateCategory} from "../interfaces";
import {urls} from "../configs";

const categoryService = {
	getByParams: (): AxiosRes<ICategory[]> => axiosService.get(urls.categories),
	create: (newCategory: ICreateCategory): AxiosRes<void> => axiosService.post(urls.categories, newCategory)
};

export {
	categoryService
};
