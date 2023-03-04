import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IRecipesQuery, IRecipe, IRecipes, IReview} from "../../interfaces";
import {recipeService} from "../../services";

interface IState {
	list: IRecipes;
	loading: boolean;
	error: boolean;
	recipe: IRecipe | null;
	reviews: IReview[] | null;
}

const initialState: IState = {
	list: {
		recipes: [],
		page: "0",
		count: 0
	},
	loading: false,
	error: false,
	recipe: null,
	reviews: null
};

const getByQuery = createAsyncThunk<IRecipes, IRecipesQuery | null>(
	"recipeSlice/getByQuery",
	async (query, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.getByQuery(query);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const getById = createAsyncThunk<IRecipe, string>(
	"recipeSlice/getById",
	async (id, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.getById(id);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const getReviews = createAsyncThunk<IReview[], string>(
	"recipeSlice/getReviews",
	async (recipeId, {rejectWithValue}) => {
		try {
			const response = await recipeService.getReviews(recipeId);
			return response.data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const recipeSlice = createSlice({
	name: "recipeSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getByQuery.fulfilled, (state, action) => {
				state.list = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getByQuery.pending, (state) => {
				state.loading = true;
			})
			.addCase(getByQuery.rejected, (state) => {
				state.loading = false;
				state.error = true;
			})

			.addCase(getById.fulfilled, (state, action) => {
				state.recipe = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getById.pending, (state) => {
				state.loading = true;
			})
			.addCase(getById.rejected, (state) => {
				state.loading = false;
				state.error = true;
			})

			.addCase(getReviews.fulfilled, (state, action) => {
				state.reviews = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getReviews.pending, (state) => {
				state.loading = true;
			})
			.addCase(getReviews.rejected, (state) => {
				state.loading = false;
				state.error = true;
			})
});

const {reducer: recipeReducer, actions} = recipeSlice;

const recipeActions = {
	getByQuery,
	getById,
	getReviews
};

export {
	recipeActions,
	recipeReducer
};
