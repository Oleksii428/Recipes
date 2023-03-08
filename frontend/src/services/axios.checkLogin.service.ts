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

let isRefreshing = false;
checkLoginService.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const refreshToken = authService.getRefreshToken();

	if (error.response?.data.status === 401 && refreshToken && !isRefreshing) {
		isRefreshing = true;

		try {
			const {data: newTokenData} = await authService.refresh(refreshToken);
			console.log(newTokenData, "CHECK LOGIN AXIOS");
			authService.setTokenData(newTokenData);
		} catch (e) {
			authService.deleteTokenData();
		}

		isRefreshing = false;
		return axiosService(error.config);
	}

	return Promise.reject(error);
});

export {
	checkLoginService
};
