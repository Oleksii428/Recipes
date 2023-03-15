import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Grid} from "@mui/material";

import {Recipe} from "../Recipe/Recipe";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recipeActions} from "../../redux";
import {IRecipesQuery} from "../../interfaces";
import {MyPagination} from "../MyPagingation/MyPagination";
import {RecipeSkeleton} from "../Skeletons";

const Recipes: FC = () => {
	const dispatch = useAppDispatch();
	const {list, loading, error} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		let newQuery: IRecipesQuery = {};

		for (const [key, value] of searchParams.entries()) {
			newQuery = {...newQuery, [key]: value};
		}

		dispatch(recipeActions.getByQuery(newQuery));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
			<Grid minHeight="90vh" container justifyContent="center" spacing={3}>
				{
					error && <h2>ERROR</h2>
				}
				{
					!loading && !error &&
					list.recipes.map(recipe =>
						<Recipe showModerateButton={false} recipe={recipe} key={recipe._id} />
					)
				}
				{
					loading && !error &&
					[...Array(8).keys()].map((number, index) =>
						<RecipeSkeleton key={index} />
					)
				}
			</Grid>
			<MyPagination count={list.count} />
		</Box>
	);
};

export {Recipes};
