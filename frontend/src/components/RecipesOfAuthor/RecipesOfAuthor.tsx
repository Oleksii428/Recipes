import {FC, useLayoutEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {CircularProgress, Box, Grid} from "@mui/material";

import {Recipe} from "../Recipe/Recipe";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authorActions} from "../../redux";
import {IRecipesQuery} from "../../interfaces";
import {MyPagination} from "../MyPagingation/MyPagination";

const RecipesOfAuthor: FC = () => {
	const dispatch = useAppDispatch();
	const {id} = useParams();
	const {recipesList, loading, error} = useAppSelector(state => state.authorReducer);
	const [searchParams] = useSearchParams();

	useLayoutEffect(() => {
		let query: IRecipesQuery = {};

		for (const [key, value] of searchParams.entries()) {
			query = {...query, [key]: value};
		}

		if (id) {
			dispatch(authorActions.getRecipesOfAuthor({id, query}));
		}
	}, [dispatch, id, searchParams]);

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
					recipesList.recipes.map(recipe =>
						<Recipe recipe={recipe} key={recipe._id} />
					)
				}
			</Grid>
			<MyPagination count={recipesList.count} />
		</Box>
	);
};

export {RecipesOfAuthor};
