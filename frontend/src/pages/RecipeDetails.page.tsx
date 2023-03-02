import {FC, useEffect} from "react";
import {Box, CircularProgress, Container} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {recipeActions} from "../redux";
import {CarouselSlider, Info} from "../components";

const RecipeDetailsPage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {recipe, loading, error} = useAppSelector(state => state.recipeReducer);

	useEffect(() => {
		dispatch(recipeActions.getById(id as string));
	}, [dispatch, id]);

	return (
		<Container sx={{display: "flex", justifyContent: "flex-start", columnGap: 3}} maxWidth={"lg"}>
			{
				loading &&
				<Box sx={{display: "flex"}}>
					<CircularProgress />
				</Box>
			}
			{
				recipe &&
				<Box>
					<Info
						title={recipe.title}
						description={recipe.description}
						rating={recipe.rating}
						reviewsCount={recipe.reviewsCount}
						creator={recipe.creator}
						createdAt={recipe.createdAt}
					/>
					<CarouselSlider gallery={recipe.gallery} />
				</Box>
			}
		</Container>
	);
};

export {RecipeDetailsPage};
