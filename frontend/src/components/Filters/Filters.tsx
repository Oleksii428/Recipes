import {FC} from "react";
import {Stack} from "@mui/material";

import {CategoryFilter} from "../CategoryFilter/CategoryFilter";
import {KitchenFilter} from "../kitchenFilter/KitchenFilter";

const Filters: FC = () => {
	return (
		<Stack spacing={1} sx={{width: 300}}>
			<CategoryFilter />
			<KitchenFilter />
		</Stack>
	);
};

export {Filters};
