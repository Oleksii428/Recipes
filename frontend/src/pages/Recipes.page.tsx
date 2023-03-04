import {FC} from "react";
import {Container} from "@mui/material";

import {RecipesFilters, Recipes} from "../components";

const RecipesPage: FC = () => {
	return (
		<Container sx={{display: "flex", columnGap: 3}} maxWidth={"xl"}>
			<RecipesFilters />
			<Recipes />
		</Container>
	);
};

export {RecipesPage};
