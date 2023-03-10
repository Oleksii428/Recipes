import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICreateReview, IErrorResponse} from "../../interfaces";
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

const createReview = createAsyncThunk<void, { recipeId: string, review: ICreateReview }, { rejectValue: IErrorResponse }>(
	"reviewSlice/createReview",
	async ({recipeId, review}, {rejectWithValue}) => {
		try {
			console.log(review.photo);
			const {data} = await recipeService.createReview(recipeId, review);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const reviewSlice = createSlice({
	name: "reviewSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// reviewToggle
			.addCase(createReview.fulfilled, state => {
				state.statusCode = 201;
				state.loading = false;
			})
			.addCase(createReview.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(createReview.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: reviewReducer} = reviewSlice;

const reviewActions = {
	createReview
};

export {
	reviewActions,
	reviewReducer
};
