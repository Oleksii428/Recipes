import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IRecipes} from "../../interfaces";
import {recipeService} from "../../services";

interface IState {
	list: IRecipes;
}

const initialState: IState = {
	list: {
		recipes: [],
		page: "0",
		count: 0
	}
};

const getByQuery = createAsyncThunk<IRecipes, void>(
	"recipeSlice/getByQuery",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.getByQuery();
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
			.addCase(getByQuery.fulfilled, (state, actions) => {
				state.list = actions.payload;
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
