import {AxiosRes, axiosService} from "./axios.servise";

import {ILoginData, ITokenData} from "../interfaces";
import {urls} from "../configs";

const authService = {
	login: ({userName, password}: ILoginData): AxiosRes<ITokenData> => axiosService.post(urls.login, {
		userName,
		password
	}),
	refresh: (refreshToken: string): AxiosRes<ITokenData> => axiosService.post(urls.refresh, {refreshToken}),
	setTokenData: ({accessToken, refreshToken, author}: ITokenData) => {
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
		localStorage.setItem("loginAuthorId", author);
	},
	deleteTokenData: () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("loginAuthorId");
	},
	getAccessToken: () => localStorage.getItem("accessToken"),
	getRefreshToken: () => localStorage.getItem("refreshToken"),
	getLoginAuthorId: () => localStorage.getItem("loginAuthorId")
};

export {
	authService
};
