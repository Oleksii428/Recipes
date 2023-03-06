import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse, ILoginData, ITokenData} from "../../interfaces";
import {authService} from "../../services";

interface IState {
	tokenData: ITokenData | null;
	loading: boolean;
	errorMessage: string | null;
	statusCode: number | null;
}

const initialState: IState = {
	tokenData: null,
	loading: false,
	errorMessage: null,
	statusCode: null
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

const authSlice = createSlice({
	name: "authorSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
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
});

const {reducer: authReducer, actions} = authSlice;

const authActions = {
	login
};

export {
	authActions,
	authReducer
};
