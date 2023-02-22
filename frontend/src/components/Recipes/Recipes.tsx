import {FC, useEffect} from "react";

import {Recipe} from "../Recipe/Recipe";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {recipeActions} from "../../redux";

import {Container, Grid} from "@mui/material";

const Recipes: FC = () => {
	const {list} = useAppSelector(state => state.recipeReducer);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(recipeActions.getByQuery());
	}, [dispatch]);

	return (
		<Container maxWidth={"lg"}>
			<Grid container spacing={2}>
				{list.recipes.map(recipe => <Recipe recipe={recipe} key={recipe._id} />)}
			</Grid>
		</Container>
	);
};

export {Recipes};
