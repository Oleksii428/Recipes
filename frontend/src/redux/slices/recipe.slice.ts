import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IQuery, IRecipes} from "../../interfaces";
import {recipeService} from "../../services";

interface IState {
	list: IRecipes;
	loading: boolean;
	error: boolean;
}

const initialState: IState = {
	list: {
		recipes: [],
		page: "0",
		count: 0
	},
	loading: false,
	error: false
};

const getByQuery = createAsyncThunk<IRecipes, IQuery | null>(
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
			.addCase(getByQuery.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getByQuery.rejected, (state, action) => {
				state.loading = false;
				state.error = true;
			})
});

const {reducer: recipeReducer, actions} = recipeSlice;

const recipeActions = {
	getByQuery
};

export {
	recipeActions,
	recipeReducer
};
