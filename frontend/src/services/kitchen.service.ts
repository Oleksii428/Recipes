import {AxiosRes, axiosService} from "./axios.servise";

import {ICreateKitchen, IKitchen} from "../interfaces";
import {urls} from "../configs";

const kitchenService = {
	getByParams: (): AxiosRes<IKitchen[]> => axiosService.get(urls.kitchens),
	create: (newKitchen: ICreateKitchen): AxiosRes<void> => axiosService.post(urls.kitchens, newKitchen)
};

export {
	kitchenService
};
