import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuthors, IAuthorsQuery, IRecipes, IRecipesQuery} from "../../interfaces";
import {authorService} from "../../services";

interface IState {
	list: IAuthors;
	recipesList: IRecipes;
	loading: boolean;
	error: boolean;
}

const initialState: IState = {
	list: {
		authors: [],
		page: "0",
		count: 0
	},
	recipesList: {
		recipes: [],
		page: "0",
		count: 0
	},
	loading: false,
	error: false
};

const getByQuery = createAsyncThunk<IAuthors, IAuthorsQuery | null>(
	"authorSlice/getByQuery",
	async (query, {rejectWithValue}) => {
		try {
			const {data} = await authorService.getByQuery(query);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

interface IParams {
	id: string;
	query: IRecipesQuery | null;
}

const getRecipesOfAuthor = createAsyncThunk<IRecipes, IParams>(
	"authorSlice/getRecipesOfAuthor",
	async ({id, query}, {rejectWithValue}) => {
		try {
			const {data} = await authorService.getRecipesOfAuthor(id, query);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const authorSlice = createSlice({
	name: "authorSlice",
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

			.addCase(getRecipesOfAuthor.fulfilled, (state, action) => {
				state.recipesList = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getRecipesOfAuthor.pending, (state) => {
				state.loading = true;
			})
			.addCase(getRecipesOfAuthor.rejected, (state) => {
				state.loading = false;
				state.error = true;
			})
});

const {reducer: authorReducer, actions} = authorSlice;

const authorActions = {
	getByQuery,
	getRecipesOfAuthor
};

export {
	authorActions,
	authorReducer
};
