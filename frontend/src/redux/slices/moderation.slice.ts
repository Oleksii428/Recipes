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

const moderateRecipe = createAsyncThunk<void, string, { rejectValue: IErrorResponse }>(
	"moderationSlice/moderateRecipe",
	async (authorId, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.moderate(authorId);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const moderationSlice = createSlice({
	name: "moderationSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// moderateRecipe
			.addCase(moderateRecipe.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(moderateRecipe.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(moderateRecipe.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: moderationReducer} = moderationSlice;

const moderationActions = {
	moderateRecipe
};

export {
	moderationActions,
	moderationReducer
};
