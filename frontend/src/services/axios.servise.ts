import axios, {AxiosResponse} from "axios";
import {createBrowserHistory, History} from "history";

import {baseURL} from "../configs";
import {authService} from "./auth.service";

const history: History = createBrowserHistory();

type AxiosRes<G> = Promise<AxiosResponse<G>>

const axiosService = axios.create({baseURL});
let isRefreshing = false;

axiosService.interceptors.request.use((config) => {
	const accessToken = authService.getAccessToken();

	if (accessToken) {
		config.headers.Authorization = accessToken;
	}

	return config;
});

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

export type {
	AxiosRes
};

export {
	axiosService,
	history
};
