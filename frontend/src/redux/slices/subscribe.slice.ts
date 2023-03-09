import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse, ISubscribe} from "../../interfaces";
import {authorService} from "../../services";

interface IState {
	isSubscribed: boolean;
	loading: boolean;
	statusCode: number | null;
	errorMessage: string | null;
}

const initialState: IState = {
	isSubscribed: false,
	loading: false,
	statusCode: null,
	errorMessage: null
};

const subscribeToggle = createAsyncThunk<ISubscribe, string, { rejectValue: IErrorResponse }>(
	"subscribeSlice/subscribeToggle",
	async (authorId, {rejectWithValue}) => {
		try {
			const {data} = await authorService.subscribeToggle(authorId);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const subscribeSlice = createSlice({
	name: "subscribeSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// subscribeToggle
			.addCase(subscribeToggle.fulfilled, (state, action) => {
				state.isSubscribed = action.payload.isSubscribed;
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(subscribeToggle.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(subscribeToggle.rejected, (state, action) => {
				state.isSubscribed = false;
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: subscribeReducer} = subscribeSlice;

const subscribeActions = {
	subscribeToggle
};

export {
	subscribeActions,
	subscribeReducer
};
