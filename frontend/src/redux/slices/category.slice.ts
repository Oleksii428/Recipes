import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICategory, ICreateCategory, IErrorResponse} from "../../interfaces";
import {categoryService} from "../../services/category.service";

interface IState {
	categories: ICategory[];
	loading: boolean;
	error: boolean;
	statusCode: number | undefined;
	errorMessage: string | undefined;
}

const initialState: IState = {
	categories: [],
	loading: false,
	error: false,
	statusCode: undefined,
	errorMessage: undefined
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

const createCategory = createAsyncThunk<void, ICreateCategory, { rejectValue: IErrorResponse }>(
	"categorySlice/createCategory",
	async (newCategory, {rejectWithValue}) => {
		try {
			const {data} = await categoryService.create(newCategory);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
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
			// createCategory
			.addCase(createCategory.fulfilled, state => {
				state.loading = false;
				state.statusCode = 201;
			})
			.addCase(createCategory.pending, state => {
				state.loading = true;
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message;
				state.statusCode = action.payload?.status;
			})
});

const {reducer: categoryReducer} = categorySlice;

const categoryActions = {
	getByParams,
	createCategory
};

export {
	categoryActions,
	categoryReducer
};
