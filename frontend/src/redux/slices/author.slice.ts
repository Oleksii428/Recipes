import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {
	IAuthor,
	IAuthors,
	IAuthorsQuery,
	IErrorResponse,
	IRecipes,
	IRecipesQuery
} from "../../interfaces";
import {authorService} from "../../services";

interface IState {
	list: IAuthors;
	recipesList: IRecipes;
	loading: boolean;
	error: boolean;
	author: IAuthor | null;
	errorMessage: string | null;
	statusCode: number | null;
	successMessage: string | null;
}

const initialState: IState = {
	list: {
		authors: [],
		page: "0",
		count: 0
	},
	recipesList: {
		recipes: [],
		page: "0",
		count: 0
	},
	loading: false,
	error: false,
	author: null,
	errorMessage: null,
	statusCode: null,
	successMessage: null
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

interface IParams {
	id: string;
	query: IRecipesQuery | null;
}

const getRecipesOfAuthor = createAsyncThunk<IRecipes, IParams>(
	"authorSlice/getRecipesOfAuthor",
	async ({id, query}, {rejectWithValue}) => {
		try {
			const {data} = await authorService.getRecipesOfAuthor(id, query);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const getById = createAsyncThunk<IAuthor, string>(
	"authorSlice/getById",
	async (id, {rejectWithValue}) => {
		try {
			const {data} = await authorService.getById(id);
			return data;
		} catch (e) {
			const err = e as AxiosError;
			return rejectWithValue(err.response?.data);
		}
	}
);

const uploadAvatar = createAsyncThunk<void, { avatar: File }, { rejectValue: IErrorResponse }>(
	"authorSlice/uploadAvatar",
	async ({avatar}, {rejectWithValue}) => {
		try {
			const {data} = await authorService.uploadAvatar(avatar);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const changeUserName = createAsyncThunk<void, { userName: string }, { rejectValue: IErrorResponse }>(
	"authorSlice/changeUserName",
	async ({userName}, {rejectWithValue}) => {
		try {
			const {data} = await authorService.changeUserName(userName);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const makeAdmin = createAsyncThunk<string, string, { rejectValue: IErrorResponse }>(
	"authorSlice/makeAdmin",
	async (id, {rejectWithValue}) => {
		try {
			const {data} = await authorService.makeAdmin(id);
			return data;
		} catch (e) {
			const err = e as AxiosError<IErrorResponse>;
			return rejectWithValue(err.response!.data);
		}
	}
);

const authorSlice = createSlice({
	name: "authorSlice",
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			// getByQuery
			.addCase(getByQuery.fulfilled, (state, action) => {
				state.list = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getByQuery.pending, state => {
				state.loading = true;
			})
			.addCase(getByQuery.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// getRecipesOfAuthor
			.addCase(getRecipesOfAuthor.fulfilled, (state, action) => {
				state.recipesList = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getRecipesOfAuthor.pending, state => {
				state.loading = true;
			})
			.addCase(getRecipesOfAuthor.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// getById
			.addCase(getById.fulfilled, (state, action) => {
				state.author = action.payload;
				state.loading = false;
				state.error = false;
			})
			.addCase(getById.pending, state => {
				state.loading = true;
			})
			.addCase(getById.rejected, state => {
				state.loading = false;
				state.error = true;
			})
			// uploadAvatar
			.addCase(uploadAvatar.fulfilled, state => {
				state.statusCode = 201;
				state.loading = false;
			})
			.addCase(uploadAvatar.pending, state => {
				state.statusCode = null;
				state.loading = true;
			})
			.addCase(uploadAvatar.rejected, (state, action) => {
				state.statusCode = action.payload?.status ?? 500;
				state.loading = false;
			})
			// changeUserName
			.addCase(changeUserName.fulfilled, state => {
				state.statusCode = 200;
				state.loading = false;
			})
			.addCase(changeUserName.pending, state => {
				state.statusCode = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(changeUserName.rejected, (state, action) => {
				state.statusCode = action.payload?.status ?? 500;
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.loading = false;
			})
			// makeAdmin
			.addCase(makeAdmin.fulfilled, (state, action) => {
				state.successMessage = action.payload;
				state.loading = false;
			})
			.addCase(makeAdmin.pending, state => {
				state.successMessage = null;
				state.errorMessage = null;
				state.loading = true;
			})
			.addCase(makeAdmin.rejected, (state, action) => {
				state.errorMessage = action.payload?.message ?? "Unknown error";
				state.loading = false;
			})
});

const {reducer: authorReducer} = authorSlice;

const authorActions = {
	getByQuery,
	getRecipesOfAuthor,
	getById,
	uploadAvatar,
	changeUserName,
	makeAdmin
};

export {
	authorActions,
	authorReducer
};
