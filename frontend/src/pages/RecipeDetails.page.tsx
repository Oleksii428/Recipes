import {FC, useEffect} from "react";
import {Box, CircularProgress, Container} from "@mui/material";
import {useParams} from "react-router-dom";
import {useInView} from "react-intersection-observer";

import {useAppDispatch, useAppSelector} from "../hooks";
import {recipeActions} from "../redux";
import {
	CarouselSlider,
	Characteristic,
	RecipeInfo,
	Ingredients,
	Reviews,
	Stages,
	CreateReviewForm
} from "../components";

const RecipeDetailsPage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const [ref, inView] = useInView({triggerOnce: true});
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
			{error && <Box>ERROR</Box>}
			{
				recipe &&
				<Box sx={{pb: 5}}>
					<RecipeInfo
						_id={recipe._id}
						inBook={recipe.inBook}
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
					<Stages stages={[...recipe.stages].sort((a, b) => a.number - b.number)} />
					<CreateReviewForm _id={recipe._id} />
					<Box ref={ref}>
						{inView && <Reviews recipeId={recipe._id} reviewsCount={recipe.reviewsCount} />}
					</Box>
				</Box>
			}
		</Container>
	);
};

export {RecipeDetailsPage};
