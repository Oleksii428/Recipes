import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookActions} from "../../../redux";
import {RecipeSkeleton} from "../../Skeletons";
import {MyPagination} from "../../MyPagingation/MyPagination";
import {MyRecipe} from "../MyRecipe/MyRecipe";

const MyBook: FC = () => {
	const dispatch = useAppDispatch();
	const {myRecipes, loading, error} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(bookActions.getMyBook(searchParams.get("page")));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
			<Grid minHeight="90vh" container justifyContent="center" spacing={3}>
				{
					error && <h2>ERROR</h2>
				}
				{
					!loading && !error && !!myRecipes.recipes.length &&
					myRecipes.recipes.map(recipe =>
						<MyRecipe showBook={true} recipe={recipe} key={recipe._id} />
					)
				}
				{
					!loading && !error && !myRecipes.recipes.length &&
					<Typography variant="h4" sx={{pt: 4}}>You book is empty</Typography>
				}
				{
					loading && !error &&
					[...Array(8).keys()].map((number, index) =>
						<RecipeSkeleton key={index} />
					)
				}
			</Grid>
			<MyPagination count={myRecipes.count} />
		</Box>
	);
};

export {MyBook};
