import {FC, useCallback, useEffect} from "react";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {
	AuthorDetailsPage,
	AuthorsPage, CabinetPage,
	ForgotPasswordPage,
	LoginPage,
	RecipeDetailsPage,
	RecipesPage,
	RegisterPage,
	RestorePasswordPage
} from "./pages";
import {useAppDispatch, useAppSelector} from "./hooks";
import {authActions} from "./redux";
import {authService} from "./services";
import {
	CreateCategory,
	CreateKitchen,
	CreateRecipe,
	ModerationList,
	MyBook,
	MyRecipes,
	ProfileSettings
} from "./components";

const App: FC = () => {
	const dispatch = useAppDispatch();
	const accessToken = authService.getAccessToken();

	const {loginAuthor} = useAppSelector(state => state.authReducer);

	useEffect(() => {
		if (accessToken) {
			dispatch(authActions.isLogin());
		}
	}, [accessToken, dispatch]);

	const PrivateRouteWrapper = useCallback((): JSX.Element => {
		return <div>{loginAuthor && accessToken ? <Outlet /> : <Navigate to={"/login"} />}</div>;
	}, [accessToken, loginAuthor]);

	return (
		<Routes>
			<Route path={""} element={<MainLayout />}>
				<Route index element={<Navigate to={"recipes"} />} />
				<Route path={"recipes"} element={<RecipesPage />} />
				<Route path={"recipes/:id"} element={<RecipeDetailsPage />} />
				<Route path={"authors"} element={<AuthorsPage />} />
				<Route path={"authors/:id"} element={<AuthorDetailsPage />} />
				<Route path={"/login"} element={<LoginPage />} />
				<Route path={"register"} element={<RegisterPage />} />
				<Route path={"forgot-password"} element={<ForgotPasswordPage />} />
				<Route path={"restore-password"} element={<RestorePasswordPage />} />
				<Route element={<PrivateRouteWrapper />}>
					<Route path={"cabinet"} element={<CabinetPage />}>
						<Route path={"profile"} element={<ProfileSettings />} />
						<Route path={"my-recipes"} element={<MyRecipes />} />
						<Route path={"my-book"} element={<MyBook />} />
						<Route path={"create-recipe"} element={<CreateRecipe />} />
						<Route path={"moderation"} element={<ModerationList />} />
						<Route path={"create-category"} element={<CreateCategory />} />
						<Route path={"create-kitchen"} element={<CreateKitchen />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export {App};
