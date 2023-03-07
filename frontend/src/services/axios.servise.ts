import axios, {AxiosResponse} from "axios";
import {createBrowserHistory, History} from "history";


import {baseURL} from "../configs";
import {authService} from "./auth.service";

const history: History = createBrowserHistory();

type AxiosRes<G> = Promise<AxiosResponse<G>>

const axiosService = axios.create({baseURL});
const axiosService2 = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
	const accessToken = authService.getAccessToken();

	if (accessToken) {
		config.headers.Authorization = accessToken;
	}

	return config;
});

let isRefreshing = false;
axiosService.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const refreshToken = authService.getRefreshToken();

	if (error.response?.data.status === 401 && refreshToken && !isRefreshing) {
		isRefreshing = true;

		try {
			const {data: newTokenData} = await authService.refresh(refreshToken);
			authService.setTokenData(newTokenData);
		} catch (e) {
			authService.deleteTokenData();
			history.replace("/login?expSession=true");
		}

		isRefreshing = false;
		return axiosService(error.config);
	}

	return Promise.reject(error);
});


// 2
axiosService2.interceptors.request.use((config) => {
	const accessToken = authService.getAccessToken();

	if (accessToken) {
		config.headers.Authorization = accessToken;
	}

	return config;
});

let isRefreshing2 = false;
axiosService2.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const refreshToken = authService.getRefreshToken();

	if (error.response?.data.status === 401 && refreshToken && !isRefreshing2) {
		isRefreshing2 = true;

		try {
			const {data: newTokenData} = await authService.refresh(refreshToken);
			authService.setTokenData(newTokenData);
		} catch (e) {
			authService.deleteTokenData();
			history.replace("/login?expSession=true");
		}

		isRefreshing2 = false;
		return axiosService(error.config);
	}

	return Promise.reject(error);
});

export type {
	AxiosRes
};

export {
	axiosService,
	axiosService2,
	history
};
