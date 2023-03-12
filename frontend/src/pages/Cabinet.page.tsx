import {FC} from "react";
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

import {CabinetNavigation} from "../components";

const CabinetPage: FC = () => {
	return (
		<Container sx={{columnGap: 3, display: "flex"}} maxWidth={"lg"}>
			<CabinetNavigation />
			<Outlet />
		</Container>
	);
};

export {CabinetPage};
