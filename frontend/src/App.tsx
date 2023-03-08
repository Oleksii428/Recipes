import {FC, useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {
	AuthorDetailsPage,
	AuthorsPage,
	ForgotPasswordPage,
	LoginPage,
	RecipeDetailsPage,
	RecipesPage,
	RegisterPage
} from "./pages";
import {useAppDispatch} from "./hooks";
import {authActions} from "./redux";
import {authService} from "./services";

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
			</Route>
		</Routes>
	);
};

export {App};
