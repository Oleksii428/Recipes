import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse} from "../../interfaces";
import {authorService} from "../../services";

interface IState {
	loading: boolean;
	statusCode: number | null;
	errorMessage: string | null;
}

const initialState: IState = {
	loading: false,
	statusCode: null,
	errorMessage: null
};

const likeToggle = createAsyncThunk<void, string, { rejectValue: IErrorResponse }>(
	"likeSlice/likeToggle",
	async (likeId, {rejectWithValue}) => {
		try {
			const {data} = await authorService.likeToggle(likeId);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const likeSlice = createSlice({
	name: "likeSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// likeToggle
			.addCase(likeToggle.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(likeToggle.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(likeToggle.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: likeReducer} = likeSlice;

const likeActions = {
	likeToggle
};

export {
	likeActions,
	likeReducer
};
