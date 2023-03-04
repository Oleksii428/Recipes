import {FC} from "react";
import {Box, Stack} from "@mui/material";

import {NameFilter} from "../NameFilter/NameFilter";
import {SortFilter} from "../SortFilter/SortFilter";

const AuthorsFilters: FC = () => {

	const sortFields = ["totalLikes", "userName"];

	return (
		<Box>
			<Stack spacing={1} sx={{width: 300, display: "flex", flexDirection: "column", rowGap: 1}}>
				<NameFilter />
				<SortFilter fields={sortFields} defaultField={"totalLikes"} />
			</Stack>
		</Box>
	);
};

export {AuthorsFilters};
