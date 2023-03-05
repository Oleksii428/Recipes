import {FC} from "react";
import {Box, Container} from "@mui/material";

import {RecipesFilters, RecipesOfAuthor} from "../components";

const AuthorDetailsPage: FC = () => {
	return (
		<Container maxWidth={"xl"}>
			<div>
				INFO
			</div>
			<Box sx={{display: "flex", columnGap: 3}}>
				<RecipesFilters />
				<RecipesOfAuthor />
			</Box>
		</Container>
	);
};

export {AuthorDetailsPage};
