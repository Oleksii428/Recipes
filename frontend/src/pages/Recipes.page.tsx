import {FC} from "react";
import {Container} from "@mui/material";

import {RecipesFilters, Recipes} from "../components";

const RecipesPage: FC = () => {
	return (
		<Container sx={{position: "relative", columnGap: 3, display: "flex"}} maxWidth={"xl"}>
			<RecipesFilters />
			<Recipes />
		</Container>
	);
};

export {RecipesPage};
