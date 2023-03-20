import {AxiosRes, axiosService} from "./axios.servise";
import {checkLoginService} from "./axios.checkLogin.service";
import {IAuthor, IForgotData, ILoginData, IRegisterData, IRestoreData, ITokenData} from "../interfaces";
import {urls} from "../configs";

const authService = {
	login: ({userName, password}: ILoginData): AxiosRes<ITokenData> => axiosService.post(urls.login, {
		userName,
		password
	}),
	logout: (): AxiosRes<void> => axiosService.post(urls.logout),
	isLogin: (): AxiosRes<IAuthor> => checkLoginService.get(urls.isLogin),
	register: (data: IRegisterData): AxiosRes<void> => axiosService.post(urls.register, {
		userName: data.userName,
		password: data.password,
		email: data.email,
		adminKey: data?.adminKey
	}),
	refresh: (refreshToken: string): AxiosRes<ITokenData> => axiosService.post(urls.refresh, {refreshToken}),
	refreshLogin: (refreshToken: string): AxiosRes<ITokenData> => checkLoginService.post(urls.refresh, {refreshToken}),
	forgotPass: ({userName}: IForgotData): AxiosRes<void> => axiosService.post(urls.forgotPass, {userName}),
	restorePass: ({password, token}: IRestoreData): AxiosRes<void> =>
		axiosService.patch(urls.restorePass(token), {password}),

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
