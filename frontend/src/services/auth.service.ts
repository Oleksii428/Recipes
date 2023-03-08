import {AxiosRes, axiosService} from "./axios.servise";
import {checkLoginService} from "./axios.checkLogin.service";
import {IAuthor, ILoginData, ITokenData} from "../interfaces";
import {urls} from "../configs";

const authService = {
	login: ({userName, password}: ILoginData): AxiosRes<ITokenData> => axiosService.post(urls.login, {
		userName,
		password
	}),
	logout: (): AxiosRes<void> => axiosService.post(urls.logout),
	isLogin: (): AxiosRes<IAuthor> => checkLoginService.get(urls.isLogin),
	register: (): AxiosRes<void> => axiosService.post(urls.register),
	refresh: (refreshToken: string): AxiosRes<ITokenData> => axiosService.post(urls.refresh, {refreshToken}),
	setTokenData: ({accessToken, refreshToken}: ITokenData): void => {
		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
	},
	deleteTokenData: (): void => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	},
	getAccessToken: (): string | null => localStorage.getItem("accessToken"),
	getRefreshToken: (): string | null => localStorage.getItem("refreshToken")
};

export {
	authService
};
