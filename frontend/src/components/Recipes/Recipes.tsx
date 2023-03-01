import {FC, useLayoutEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, CircularProgress, Container, Grid} from "@mui/material";

import {Recipe} from "../Recipe/Recipe";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recipeActions} from "../../redux";
import {Filters} from "../Filters/Filters";
import {IQuery} from "../../interfaces";

const Recipes: FC = () => {
	const dispatch = useAppDispatch();
	const {list, loading} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams({});

	useLayoutEffect(() => {
		let newQuery: IQuery = {};

		for (const [key, value] of searchParams.entries()) {
			newQuery = {...newQuery, [key]: value};
		}

		dispatch(recipeActions.getByQuery(newQuery));
	}, [dispatch, searchParams]);

	return (
		<Container sx={{display: "flex", columnGap: 3}} maxWidth={"xl"}>
			<Filters />
			<Grid container justifyContent="center" spacing={3}>
				{loading ?
					<Box sx={{display: "flex"}}>
						<CircularProgress />
					</Box> :
					list.recipes.map(recipe =>
						<Recipe recipe={recipe} key={recipe._id} />
					)}
			</Grid>
		</Container>
	);
};

export {Recipes};
