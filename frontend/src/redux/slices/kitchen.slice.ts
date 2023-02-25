import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IKitchen} from "../../interfaces";
import {kitchenService} from "../../services";

interface IState {
	kitchens: IKitchen[];
	loading: boolean;
	error: boolean;
}

const initialState: IState = {
	kitchens: [],
	loading: false,
	error: false
};

const getByParams = createAsyncThunk<IKitchen[], void>(
	"kitchenSlice/getByParams",
	async (_, {rejectWithValue}) => {
		try {
			const {data} = await kitchenService.getByParams();
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const recipeSlice = createSlice({
	name: "kitchenSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(getByParams.fulfilled, (state, action) => {
				state.kitchens = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getByParams.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getByParams.rejected, (state, action) => {
				state.loading = false;
				state.error = true;
			})
});

const {reducer: kitchenReducer, actions} = recipeSlice;

const kitchenActions = {
	getByParams
};

export {
	kitchenActions,
	kitchenReducer
};
