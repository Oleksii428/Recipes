import {FC, useEffect} from "react";
import {Box, CircularProgress, Container} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {recipeActions} from "../redux";
import {CarouselSlider, Characteristic, Info, Ingredients} from "../components";

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
						bookCount={recipe.bookCount}
						creator={recipe.creator}
						createdAt={recipe.createdAt}
					/>
					<CarouselSlider gallery={recipe.gallery} />
					<Characteristic
						kitchen={recipe.kitchen}
						category={recipe.category}
						servings={recipe.servings}
						time={recipe.time}
					/>
					<Ingredients ingredients={recipe.ingredients} />
				</Box>
			}
		</Container>
	);
};

export {RecipeDetailsPage};
