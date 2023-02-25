import React, {FC, useEffect, useState} from "react";
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
	const [query, setQuery] = useState<IQuery | null>(null);

	useEffect(() => {
		let isSearchParamsEmpty: boolean = true;
		for (const [key, value] of searchParams.entries()) {
			setQuery(() => ({[key]: value}));
			isSearchParamsEmpty = false;
		}
		if (isSearchParamsEmpty) {
			setQuery(null);
		}
	}, [searchParams]);

	useEffect(() => {
		dispatch(recipeActions.getByQuery(query));
	}, [dispatch, query]);

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
