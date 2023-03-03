import {FC} from "react";
import {Box, Typography} from "@mui/material";

interface IProps {
	ingredients: string[];
}

const Ingredients: FC<IProps> = ({ingredients}) => {
	return (
		<Box>
			<Typography variant="h4" fontWeight={500}>
				Ingredients
			</Typography>
			<ul>
				{ingredients.map((ingredient, index) =>
					<li key={index}>
						<Typography variant="h5">
							{ingredient}
						</Typography>
					</li>)
				}
			</ul>
		</Box>
	);
};

export {Ingredients};
