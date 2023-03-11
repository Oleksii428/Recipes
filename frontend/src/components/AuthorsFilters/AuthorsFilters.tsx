import {FC} from "react";
import {Box, Stack} from "@mui/material";

import {NameFilter} from "../NameFilter/NameFilter";
import {SortFilterAuthors} from "../SortFilterAuthors/SortFilterAuthors";

const AuthorsFilters: FC = () => {

	return (
		<Box>
			<Stack spacing={1} sx={{width: 300, display: "flex", flexDirection: "column", rowGap: 1}}>
				<NameFilter />
				<SortFilterAuthors />
			</Stack>
		</Box>
	);
};

export {AuthorsFilters};
