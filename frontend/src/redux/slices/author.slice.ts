import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuthors, IAuthorsQuery} from "../../interfaces";
import {authorService} from "../../services";

interface IState {
	list: IAuthors;
	loading: boolean;
	error: boolean;
}

const initialState: IState = {
	list: {
		authors: [],
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
});

const {reducer: authorReducer, actions} = authorSlice;

const authorActions = {
	getByQuery
};

export {
	authorActions,
	authorReducer
};
