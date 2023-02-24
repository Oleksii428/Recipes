import {FC} from "react";
import {Stack} from "@mui/material";

import {CategoryFilter} from "../CategoryFilter/CategoryFilter";

const Filters: FC = () => {
	return (
		<Stack spacing={1} sx={{width: 300}}>
			<CategoryFilter />
		</Stack>
	);
};

export {Filters};
