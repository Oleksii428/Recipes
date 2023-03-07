import {FC, useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AuthorDetailsPage, AuthorsPage, LoginPage, RecipeDetailsPage, RecipesPage} from "./pages";
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
			</Route>
		</Routes>
	);
};

export {App};
