import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuthor, IErrorResponse, IForgotData, ILoginData, IRegisterData, ITokenData} from "../../interfaces";
import {authService} from "../../services";

interface IState {
	tokenData: ITokenData | null;
	loading: boolean;
	errorMessage: string | null;
	statusCode: number | null;
	loginAuthor: IAuthor | null;
}

const initialState: IState = {
	tokenData: null,
	loading: false,
	errorMessage: null,
	statusCode: null,
	loginAuthor: null
};

const login = createAsyncThunk<ITokenData, ILoginData, { rejectValue: IErrorResponse }>(
	"authSlice/login",
	async ({userName, password}, {rejectWithValue}) => {
		try {
			const {data} = await authService.login({userName, password});
			authService.setTokenData(data);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const isLogin = createAsyncThunk<IAuthor, void, { rejectValue: IErrorResponse }>(
	"authSlice/isLogin",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await authService.isLogin();
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const logout = createAsyncThunk<void, void, { rejectValue: IErrorResponse }>(
	"authSlice/logout",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await authService.logout();
			authService.deleteTokenData();
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const register = createAsyncThunk<void, IRegisterData, { rejectValue: IErrorResponse }>(
	"authSlice/register",
	async ({userName, password, email, adminKey}, {rejectWithValue}) => {
		try {
			const {data} = await authService.register({userName, password, email, adminKey});
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const forgotPass = createAsyncThunk<void, IForgotData, { rejectValue: IErrorResponse }>(
	"authSlice/forgotPass",
	async (userName, {rejectWithValue}) => {
		try {
			const {data} = await authService.forgotPass(userName);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const authSlice = createSlice({
	name: "authorSlice",
	initialState,
	reducers: {
		cleanLoginAuthor: state => {
			state.loginAuthor = null;
		}
	},
	extraReducers: builder =>
		builder
			// login
			.addCase(login.fulfilled, (state, action) => {
				state.loginAuthor = action.payload.author;
				state.tokenData = action.payload;
				state.loading = false;
				state.errorMessage = null;
				state.statusCode = 200;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.errorMessage = null;
				state.statusCode = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
			// isLogin
			.addCase(isLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.loginAuthor = action.payload;
				state.errorMessage = null;
				state.statusCode = 200;
			})
			.addCase(isLogin.pending, (state) => {
				state.loading = true;
				state.errorMessage = null;
				state.statusCode = null;
			})
			.addCase(isLogin.rejected, (state) => {
				state.loading = false;
				state.loginAuthor = null;
			})
			// logout
			.addCase(logout.fulfilled, (state) => {
				state.tokenData = null;
				state.loading = false;
				state.loginAuthor = null;
				state.errorMessage = null;
				state.statusCode = 200;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
				state.errorMessage = null;
				state.statusCode = null;
			})
			.addCase(logout.rejected, (state) => {
				state.loading = false;
			})
			// register
			.addCase(register.fulfilled, (state) => {
				state.loading = false;
				state.errorMessage = null;
				state.statusCode = 201;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.errorMessage = null;
				state.statusCode = null;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
			// forgotPass
			.addCase(forgotPass.fulfilled, (state) => {
				state.loading = false;
				state.errorMessage = null;
				state.statusCode = 200;
			})
			.addCase(forgotPass.pending, (state) => {
				state.loading = true;
				state.errorMessage = null;
				state.statusCode = null;
			})
			.addCase(forgotPass.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: authReducer, actions: {cleanLoginAuthor}} = authSlice;

const authActions = {
	login,
	isLogin,
	logout,
	register,
	forgotPass,
	cleanLoginAuthor
};

export {
	authActions,
	authReducer
};
