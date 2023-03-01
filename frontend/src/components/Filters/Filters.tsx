import {FC} from "react";
import {Stack} from "@mui/material";

import {CategoryFilter} from "../CategoryFilter/CategoryFilter";
import {KitchenFilter} from "../kitchenFilter/KitchenFilter";
import {TitleFilter} from "../TitleFilter/TitleFilter";
import {IngredientsFilter} from "../IngredientsFilter/IngredientsFilter";
import {TimeFilter} from "../TimeFilter/TimeFilter";
import {ServingsFilter} from "../SevringsFilter/ServingsFilter";
import {SortFilter} from "../SortFilter/SortFilter";
import {SortTypeFilter} from "../SortTypeFilter/SortTypeFilter";

const Filters: FC = () => {
	return (
		<Stack spacing={1} sx={{width: 300}}>
			<CategoryFilter />
			<KitchenFilter />
			<TitleFilter />
			<IngredientsFilter />
			<TimeFilter />
			<ServingsFilter />
			<SortFilter />
			<SortTypeFilter />
		</Stack>
	);
};

export {Filters};
