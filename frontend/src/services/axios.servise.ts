import axios, {AxiosResponse} from "axios";

import {baseURL} from "../configs";

type AxiosRes<G> = Promise<AxiosResponse<G>>

const axiosService = axios.create({baseURL});

export type {
	AxiosRes
};
export {
	axiosService
};
