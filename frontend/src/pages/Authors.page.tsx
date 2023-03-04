import {FC} from "react";
import {Container} from "@mui/material";

import {Authors, AuthorsFilters} from "../components";

const AuthorsPage: FC = () => {
	return (
		<Container sx={{display: "flex", columnGap: 3}} maxWidth={"xl"}>
			<AuthorsFilters />
			<Authors />
		</Container>
	);
};

export {AuthorsPage};
