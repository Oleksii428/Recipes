import {FC, useEffect} from "react";
import {Box, CircularProgress, Container} from "@mui/material";
import {useParams} from "react-router-dom";

import {AuthorInfo, RecipesFilters, RecipesOfAuthor} from "../components";
import {useAppDispatch, useAppSelector} from "../hooks";
import {authorActions} from "../redux";

const AuthorDetailsPage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {author, loading, error} = useAppSelector(state => state.authorReducer);

	useEffect(() => {
		dispatch(authorActions.getById(id as string));
	}, [dispatch, id]);

	return (
		<Container maxWidth={"xl"}>
			{
				loading &&
				<Box sx={{display: "flex"}}>
					<CircularProgress />
				</Box>
			}
			{error && <h2>ERROR</h2>}
			{
				author &&
				<Box>
					<AuthorInfo author={author} />
					<Box sx={{display: "flex", columnGap: 3}}>
						<RecipesFilters />
						<RecipesOfAuthor />
					</Box>
				</Box>
			}
		</Container>
	);
};

export {AuthorDetailsPage};
