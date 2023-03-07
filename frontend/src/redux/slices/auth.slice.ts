import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuthor, IErrorResponse, ILoginData, ITokenData} from "../../interfaces";
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

const authSlice = createSlice({
	name: "authorSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// login
			.addCase(login.fulfilled, (state, action) => {
				state.tokenData = action.payload;
				state.loading = false;
				state.errorMessage = null;
				state.statusCode = 200;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
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
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: authReducer, actions} = authSlice;

const authActions = {
	login,
	isLogin,
	logout
};

export {
	authActions,
	authReducer
};
