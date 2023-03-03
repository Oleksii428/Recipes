import {FC, useEffect} from "react";
import {Box, CircularProgress, Typography} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {recipeActions} from "../../../redux";
import {Review} from "../Review/Review";

interface IProps {
	recipeId: string;
	reviewsCount: number;
}

const Reviews: FC<IProps> = ({reviewsCount, recipeId}) => {
	const dispatch = useAppDispatch();
	const {reviews, loading, error} = useAppSelector(state => state.recipeReducer);

	useEffect(() => {
		dispatch(recipeActions.getReviews(recipeId));
	}, [dispatch, recipeId]);

	return (
		<Box>
			<Box display="flex" columnGap={1} mb={2}>
				<Typography variant="h4" fontWeight={500}>Reviews</Typography>
				<Typography variant="h4" fontWeight={500}>({reviewsCount})</Typography>
			</Box>
			<Box sx={{display: "flex", flexDirection: "column", rowGap: 3}}>
				{
					reviews && reviews.map(review =>
						<Review key={review._id} review={review} />
					)
				}
			</Box>
			{
				loading &&
				<Box sx={{display: "flex"}}>
					<CircularProgress />
				</Box>
			}
			{
				error && <h2>ERROR</h2>
			}
		</Box>
	);
};

export {Reviews};
