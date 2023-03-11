import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse} from "../../interfaces";
import {authorService} from "../../services";

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

const blockAuthor = createAsyncThunk<void, { authorId: string, days: number }, { rejectValue: IErrorResponse }>(
	"blockSlice/blockAuthor",
	async ({authorId, days}, {rejectWithValue}) => {
		try {
			const {data} = await authorService.blockAuthor(authorId, days);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const blockSlice = createSlice({
	name: "blockSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// blockAuthor
			.addCase(blockAuthor.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(blockAuthor.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(blockAuthor.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: blockReducer} = blockSlice;

const blockActions = {
	blockAuthor
};

export {
	blockActions,
	blockReducer
};
