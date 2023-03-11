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

const sendReport = createAsyncThunk<void, { authorId: string, text: string }, { rejectValue: IErrorResponse }>(
	"reportSlice/sendReport",
	async ({authorId, text}, {rejectWithValue}) => {
		try {
			const {data} = await authorService.sendReport(authorId, text);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const reportSlice = createSlice({
	name: "reportSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// sendReport
			.addCase(sendReport.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(sendReport.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(sendReport.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: reportReducer} = reportSlice;

const reportActions = {
	sendReport
};

export {
	reportActions,
	reportReducer
};
