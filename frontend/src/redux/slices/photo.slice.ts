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

const addPhotoToRecipe = createAsyncThunk<void, { recipeId: string, photo: File }, { rejectValue: IErrorResponse }>(
	"reportSlice/addPhotoToRecipe",
	async ({recipeId, photo}, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.addPhoto(recipeId, photo);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const photoSlice = createSlice({
	name: "photoSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// sendReport
			.addCase(addPhotoToRecipe.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(addPhotoToRecipe.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(addPhotoToRecipe.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: photoReducer} = photoSlice;

const photoActions = {
	addPhotoToRecipe
};

export {
	photoActions,
	photoReducer
};
