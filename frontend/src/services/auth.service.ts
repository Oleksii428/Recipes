import {AxiosRes, axiosService, axiosService2} from "./axios.servise";

import {IAuthor, ILoginData, ITokenData} from "../interfaces";
import {urls} from "../configs";

const authService = {
	login: ({userName, password}: ILoginData): AxiosRes<ITokenData> => axiosService.post(urls.login, {
		userName,
		password
	}),
	logout: (): AxiosRes<void> => axiosService.post(urls.logout),
	isLogin: (): AxiosRes<IAuthor> => axiosService2.get(urls.isLogin),
	refresh: (refreshToken: string): AxiosRes<ITokenData> => axiosService.post(urls.refresh, {refreshToken}),
	setTokenData: ({accessToken, refreshToken, author}: ITokenData): void => {
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
		localStorage.setItem("loginAuthorId", author);
	},
	deleteTokenData: (): void => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("loginAuthorId");
	},
	getAccessToken: (): string | null => localStorage.getItem("accessToken"),
	getRefreshToken: (): string | null => localStorage.getItem("refreshToken")
};

export {
	authService
};
