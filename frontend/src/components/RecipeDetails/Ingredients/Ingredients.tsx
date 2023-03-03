import {FC} from "react";
import {Box, Typography} from "@mui/material";

interface IProps {
	ingredients: string[];
}

const Ingredients: FC<IProps> = ({ingredients}) => {
	return (
		<Box>
			<Typography variant="h3" fontWeight={500}>
				Ingredients
			</Typography>
			<ul>
				{ingredients.map(ingredient =>
					<li>
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
