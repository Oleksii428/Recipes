import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICreateStage, IErrorResponse} from "../../interfaces";
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

const addStageToRecipe = createAsyncThunk<void, { recipeId: string, newStage: ICreateStage }, { rejectValue: IErrorResponse }>(
	"stageSlice/addStageToRecipe",
	async ({recipeId, newStage}, {rejectWithValue}) => {
		try {
			const {data} = await recipeService.addStage(recipeId, newStage);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const stageSlice = createSlice({
	name: "stageSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// addStage
			.addCase(addStageToRecipe.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(addStageToRecipe.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(addStageToRecipe.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.statusCode = action.payload?.status ?? 500;
			})
});

const {reducer: stageReducer} = stageSlice;

const stageActions = {
	addStageToRecipe
};

export {
	stageActions,
	stageReducer
};
