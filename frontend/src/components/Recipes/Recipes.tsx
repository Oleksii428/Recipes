import {FC, useLayoutEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {CircularProgress, Box, Grid} from "@mui/material";

import {Recipe} from "../Recipe/Recipe";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recipeActions} from "../../redux";
import {IRecipesQuery} from "../../interfaces";
import {RecipesPagination} from "../RecipesPagingation/RecipesPagination";

const Recipes: FC = () => {
	const dispatch = useAppDispatch();
	const {list, loading, error} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams();

	useLayoutEffect(() => {
		let newQuery: IRecipesQuery = {};

		for (const [key, value] of searchParams.entries()) {
			newQuery = {...newQuery, [key]: value};
		}

		dispatch(recipeActions.getByQuery(newQuery));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
			<Grid minHeight="90vh" container justifyContent="center" spacing={3}>
				{loading &&
					<Box sx={{display: "flex"}}>
						<CircularProgress />
					</Box>
				}
				{
					error && <h2>ERROR</h2>
				}
				{!loading && !error &&
					list.recipes.map(recipe =>
						<Recipe recipe={recipe} key={recipe._id} />
					)
				}
			</Grid>
			<RecipesPagination count={list.count} />
		</Box>
	);
};

export {Recipes};
