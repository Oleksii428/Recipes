import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IRecipesQuery, IRecipe, IRecipes, IReview, IMyRecipes, ICreateRecipe} from "../../interfaces";
import {recipeService} from "../../services";

interface IState {
	list: IRecipes;
	loading: boolean;
	error: boolean;
	recipe: IRecipe | null;
	reviews: IReview[] | null;
	myRecipes: IMyRecipes;
	createdRecipeId: string | null;
	deleted: boolean;
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
	reviews: null,
	myRecipes: {
		recipes: [],
		page: "0",
		count: 0
	},
	createdRecipeId: null,
	deleted: false
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

const getMyRecipes = createAsyncThunk<IMyRecipes, string | null>(
	"recipeSlice/getMyRecipes",
	async (page, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.getMyRecipes(page);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const create = createAsyncThunk<string, ICreateRecipe>(
	"recipeSlice/create",
	async (newRecipeData, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.create(newRecipeData);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const getNotModerated = createAsyncThunk<IRecipes, string | null>(
	"recipeSlice/getNotModerated",
	async (page, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.getNotModerated(page);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const deleteRecipe = createAsyncThunk<void, string>(
	"recipeSlice/deleteRecipe",
	async (recipeId, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.delete(recipeId);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const recipeSlice = createSlice({
	name: "recipeSlice",
	initialState,
	reducers: {
		sliceRecipe: (state, action) => {
			state.list = action.payload;
		}
	},
	extraReducers: builder =>
		builder
			// getByQuery
			.addCase(getByQuery.fulfilled, (state, action) => {
				state.list = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getByQuery.pending, state => {
				state.loading = true;
			})
			.addCase(getByQuery.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// getById
			.addCase(getById.fulfilled, (state, action) => {
				state.recipe = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getById.pending, state => {
				state.loading = true;
			})
			.addCase(getById.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// getReviews
			.addCase(getReviews.fulfilled, (state, action) => {
				state.reviews = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getReviews.pending, state => {
				state.loading = true;
			})
			.addCase(getReviews.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// getMyRecipes
			.addCase(getMyRecipes.fulfilled, (state, action) => {
				state.myRecipes = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getMyRecipes.pending, state => {
				state.loading = true;
			})
			.addCase(getMyRecipes.rejected, state => {
				state.myRecipes = {
					recipes: [],
					page: "0",
					count: 0
				};
				state.loading = false;
				state.error = true;
			})
			// create
			.addCase(create.fulfilled, (state, action) => {
				state.createdRecipeId = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(create.pending, state => {
				state.createdRecipeId = null;
				state.loading = true;
				state.error = false;
			})
			.addCase(create.rejected, state => {
				state.createdRecipeId = null;
				state.loading = false;
				state.error = true;
			})
			// getNotModerated
			.addCase(getNotModerated.fulfilled, (state, action) => {
				state.list = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getNotModerated.pending, state => {
				state.loading = true;
			})
			.addCase(getNotModerated.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// deleteRecipe
			.addCase(deleteRecipe.fulfilled, state => {
				state.deleted = true;
				state.loading = false;
			})
			.addCase(deleteRecipe.pending, state => {
				state.deleted = false;
				state.loading = true;
			})
			.addCase(deleteRecipe.rejected, state => {
				state.deleted = false;
				state.loading = false;
			})
});

const {reducer: recipeReducer, actions: {sliceRecipe}} = recipeSlice;

const recipeActions = {
	getByQuery,
	getById,
	getReviews,
	getMyRecipes,
	create,
	getNotModerated,
	sliceRecipe,
	deleteRecipe
};

export {
	recipeActions,
	recipeReducer
};
