import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICategory} from "../../interfaces";
import {categoryService} from "../../services/category.service";

interface IState {
	categories: ICategory[];
	loading: boolean;
	error: boolean;
}

const initialState: IState = {
	categories: [],
	loading: false,
	error: false
};

const getByParams = createAsyncThunk<ICategory[], void>(
	"categorySlice/getByParams",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await categoryService.getByParams();
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const categorySlice = createSlice({
	name: "categorySlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getByParams.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getByParams.pending, state => {
				state.loading = true;
			})
			.addCase(getByParams.rejected, state => {
				state.loading = false;
				state.error = true;
			})
});

const {reducer: categoryReducer} = categorySlice;

const categoryActions = {
	getByParams
};

export {
	categoryActions,
	categoryReducer
};
