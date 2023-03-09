import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authorReducer, authReducer, bookReducer, categoryReducer, kitchenReducer, recipeReducer} from "./slices";

const rootReducer = combineReducers({
	authReducer,
	authorReducer,
	recipeReducer,
	categoryReducer,
	kitchenReducer,
	bookReducer
});

const setupStore = () => configureStore({
	reducer: rootReducer
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore["dispatch"]

export type {
	RootState,
	AppStore,
	AppDispatch
};

export {
	setupStore
};

