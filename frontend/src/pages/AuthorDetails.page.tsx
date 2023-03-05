import {FC} from "react";
import {Box, Container} from "@mui/material";

import {AuthorInfo, RecipesFilters, RecipesOfAuthor} from "../components";

const AuthorDetailsPage: FC = () => {
	return (
		<Container maxWidth={"xl"}>
			<AuthorInfo />
			<Box sx={{display: "flex", columnGap: 3}}>
				<RecipesFilters />
				<RecipesOfAuthor />
			</Box>
		</Container>
	);
};

export {AuthorDetailsPage};
