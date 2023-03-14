import {FC} from "react";
import {Box, Typography} from "@mui/material";

import {CreateRecipeForm} from "../CreateRecipeForm/CreateRecipeForm";

const CreateRecipe: FC = () => {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			margin: "0 auto",
			rowGap: 2
		}}>
			<Typography variant="h3">Create recipe</Typography>
			<CreateRecipeForm />
		</Box>
	);
};

export {CreateRecipe};
