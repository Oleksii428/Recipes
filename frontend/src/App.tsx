import {FC, useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

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
import {useAppDispatch} from "./hooks";
import {authActions} from "./redux";
import {authService} from "./services";
import {CreateRecipe, ModerationList, MyBook, MyRecipes, ProfileSettings} from "./components";

const App: FC = () => {
	const dispatch = useAppDispatch();
	const accessToken = authService.getAccessToken();

	useEffect(() => {
		if (accessToken) {
			dispatch(authActions.isLogin());
		}
	}, [accessToken, dispatch]);

	return (
		<Routes>
			<Route path={""} element={<MainLayout />}>
				{/*<Route index element={<Navigate to={"recipes"} />} />*/}
				<Route path={"recipes"} element={<RecipesPage />} />
				<Route path={"recipes/:id"} element={<RecipeDetailsPage />} />
				<Route path={"authors"} element={<AuthorsPage />} />
				<Route path={"authors/:id"} element={<AuthorDetailsPage />} />
				<Route path={"login"} element={<LoginPage />} />
				<Route path={"register"} element={<RegisterPage />} />
				<Route path={"forgot-password"} element={<ForgotPasswordPage />} />
				<Route path={"restore-password"} element={<RestorePasswordPage />} />
				<Route path={"cabinet"} element={<CabinetPage />}>
					<Route index element={<Navigate to={"profile"} />} />
					<Route path={"profile"} element={<ProfileSettings />} />
					<Route path={"my-recipes"} element={<MyRecipes />} />
					<Route path={"my-book"} element={<MyBook />} />
					<Route path={"create-recipe"} element={<CreateRecipe />} />
					<Route path={"moderation"} element={<ModerationList />} />
				</Route>
			</Route>
		</Routes>
	);
};

export {App};
