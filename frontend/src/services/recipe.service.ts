import {AxiosRes, axiosService} from "./axios.servise";

import {IRecipes} from "../interfaces";
import {urls} from "../configs";

const recipeService = {
	getByQuery: (): AxiosRes<IRecipes> => axiosService.get(`${urls.recipes}`)
};

export {
	recipeService
};
