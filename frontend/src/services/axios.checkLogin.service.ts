import axios from "axios";

import {baseURL} from "../configs";
import {authService} from "./auth.service";
import {axiosService} from "./axios.servise";

const checkLoginService = axios.create({baseURL});

checkLoginService.interceptors.request.use((config) => {
	const accessToken = authService.getAccessToken();

	if (accessToken) {
		config.headers.Authorization = accessToken;
	}

	return config;
});

let isRefreshing2 = false;
checkLoginService.interceptors.response.use((config) => {
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
		}

		isRefreshing2 = false;
		return axiosService(error.config);
	}

	return Promise.reject(error);
});

export {
	checkLoginService
};
