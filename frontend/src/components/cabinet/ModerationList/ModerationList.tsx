import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {recipeActions} from "../../../redux";
import {Recipe} from "../../Recipe/Recipe";
import {RecipeSkeleton} from "../../Skeletons";
import {MyPagination} from "../../MyPagingation/MyPagination";

const ModerationList: FC = () => {
	const dispatch = useAppDispatch();
	const {list, loading, error} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(recipeActions.getNotModerated(searchParams.get("page")));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
			<Grid minHeight="90vh" container justifyContent="center" spacing={3}>
				{
					error && <h2>ERROR</h2>
				}
				{
					!loading && !error && !!list.recipes.length &&
					list.recipes.map(recipe =>
						<Recipe showModerateButton={true} recipe={recipe} key={recipe._id} />
					)
				}
				{
					!loading && !error && !list.recipes.length &&
					<Typography variant="h4" sx={{pt: 4}}>Moderation list is empty</Typography>
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

export {ModerationList};
