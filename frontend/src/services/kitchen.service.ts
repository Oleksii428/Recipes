import {AxiosRes, axiosService} from "./axios.servise";

import {IKitchen} from "../interfaces";
import {urls} from "../configs";

const kitchenService = {
	getByParams: (): AxiosRes<IKitchen[]> => axiosService.get(urls.kitchens)
};

export {
	kitchenService
};
