import {FC} from "react";
import {Box, Button, Stack} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

import {CategoryFilter} from "../CategoryFilter/CategoryFilter";
import {KitchenFilter} from "../kitchenFilter/KitchenFilter";
import {TitleFilter} from "../TitleFilter/TitleFilter";
import {IngredientsFilter} from "../IngredientsFilter/IngredientsFilter";
import {TimeFilter} from "../TimeFilter/TimeFilter";
import {ServingsFilter} from "../SevringsFilter/ServingsFilter";
import {SortFilter} from "../SortFilter/SortFilter";
import {SortTypeFilter} from "../SortTypeFilter/SortTypeFilter";

const RecipesFilters: FC = () => {
	const [query] = useSearchParams();
	const navigate = useNavigate();

	const handleClear = () => {
		const queryKeys: string[] = [];
		query.forEach((value, key) => {
			queryKeys.push(key);
		});
		for (const queryKey of queryKeys) {
			query.delete(queryKey);
		}
		navigate({search: query.toString()});
	};

	return (
		<Box>
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
			<Button
				variant="contained"
				onClick={handleClear}
			>
				Clear all filters
			</Button>
		</Box>
	);
};

export {RecipesFilters};
