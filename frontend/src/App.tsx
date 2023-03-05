import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";

import {MainLayout} from "./layouts";
import {AuthorDetailsPage, AuthorsPage, RecipeDetailsPage, RecipesPage} from "./pages";
import {setupStore} from "./redux";

const App: FC = () => {
	const store = setupStore();

	return (
		<Provider store={store}>
			<Routes>
				<Route path={""} element={<MainLayout />}>
					{/*<Route index element={<Navigate to={"recipes"} />} />*/}
					<Route path={"recipes"} element={<RecipesPage />} />
					<Route path={"recipes/:id"} element={<RecipeDetailsPage />} />
					<Route path={"authors"} element={<AuthorsPage />} />
					<Route path={"authors/:id"} element={<AuthorDetailsPage />} />
				</Route>
			</Routes>
		</Provider>
	);
};

export {App};
