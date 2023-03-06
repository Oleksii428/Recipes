import {FC} from "react";
import {Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AuthorDetailsPage, AuthorsPage, LoginPage, RecipeDetailsPage, RecipesPage} from "./pages";

const App: FC = () => {
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
