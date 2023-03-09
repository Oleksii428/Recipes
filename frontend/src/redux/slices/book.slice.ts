import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse} from "../../interfaces";
import {recipeService} from "../../services";

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

const bookToggle = createAsyncThunk<void, string, { rejectValue: IErrorResponse }>(
	"bookSlice/bookToggle",
	async (recipeId, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.bookToggle(recipeId);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const bookSlice = createSlice({
	name: "bookSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// bookToggle
			.addCase(bookToggle.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(bookToggle.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(bookToggle.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: bookReducer} = bookSlice;

const bookActions = {
	bookToggle
};

export {
	bookActions,
	bookReducer
};
