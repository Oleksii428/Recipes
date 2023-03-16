import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICreateKitchen, IErrorResponse, IKitchen} from "../../interfaces";
import {kitchenService} from "../../services";

interface IState {
	kitchens: IKitchen[];
	loading: boolean;
	error: boolean;
	statusCode: number | undefined;
	errorMessage: string | undefined;
}

const initialState: IState = {
	kitchens: [],
	loading: false,
	error: false,
	statusCode: undefined,
	errorMessage: undefined
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

const createKitchen = createAsyncThunk<void, ICreateKitchen, { rejectValue: IErrorResponse }>(
	"kitchenSlice/createKitchen",
	async (newKitchen, {rejectWithValue}) => {
		try {
			const {data} = await kitchenService.create(newKitchen);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
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
			.addCase(getByParams.pending, state => {
				state.loading = true;
			})
			.addCase(getByParams.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// createKitchen
			.addCase(createKitchen.fulfilled, state => {
				state.loading = false;
				state.statusCode = 201;
			})
			.addCase(createKitchen.pending, state => {
				state.loading = true;
			})
			.addCase(createKitchen.rejected, (state, action) => {
				state.loading = false;
				state.errorMessage = action.payload?.message;
				state.statusCode = action.payload?.status;
			})
});

const {reducer: kitchenReducer} = recipeSlice;

const kitchenActions = {
	getByParams,
	createKitchen
};

export {
	kitchenActions,
	kitchenReducer
};
