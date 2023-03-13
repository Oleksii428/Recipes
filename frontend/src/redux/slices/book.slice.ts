import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse, IMyRecipes} from "../../interfaces";
import {recipeService} from "../../services";

interface IState {
	loading: boolean;
	statusCode: number | null;
	errorMessage: string | null;
	bookList: IMyRecipes;
}

const initialState: IState = {
	loading: false,
	statusCode: null,
	errorMessage: null,
	bookList: {
		recipes: [],
		page: "0",
		count: 0
	}
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

const getMyBook = createAsyncThunk<IMyRecipes, string | null>(
	"recipeSlice/getMyRecipes",
	async (page, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.getMyBook(page);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
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
			// getMyBook
			.addCase(getMyBook.fulfilled, (state, action) => {
				state.bookList = action.payload;
				state.loading = false;
			})
			.addCase(getMyBook.pending, state => {
				state.loading = true;
			})
			.addCase(getMyBook.rejected, state => {
				state.bookList = {
					recipes: [],
					page: "0",
					count: 0
				};
				state.loading = false;
			})
});

const {reducer: bookReducer} = bookSlice;

const bookActions = {
	bookToggle,
	getMyBook
};

export {
	bookActions,
	bookReducer
};
