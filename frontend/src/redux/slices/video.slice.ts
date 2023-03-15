import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IErrorResponse} from "../../interfaces";
import {recipeService} from "../../services";

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

const addVideoToRecipe = createAsyncThunk<void, { recipeId: string, video: File }, { rejectValue: IErrorResponse }>(
	"reportSlice/addVideoToRecipe",
	async ({recipeId, video}, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.addVideo(recipeId, video);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const videoSlice = createSlice({
	name: "videoSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// addVideo
			.addCase(addVideoToRecipe.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(addVideoToRecipe.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(addVideoToRecipe.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: videoReducer} = videoSlice;

const videoActions = {
	addVideoToRecipe
};

export {
	videoActions,
	videoReducer
};
