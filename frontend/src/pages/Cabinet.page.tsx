import {FC} from "react";
import {Container, Grid} from "@mui/material";
import {Outlet} from "react-router-dom";

import {CabinetNavigation} from "../components";

const CabinetPage: FC = () => {
	return (
		<Container sx={{columnGap: 3, display: "flex"}} maxWidth={"xl"}>
			<Grid container spacing={2}>
				<Grid item xl={2}>
					<CabinetNavigation />
				</Grid>
				<Grid item xl={10}>
					<Outlet />
				</Grid>
			</Grid>
		</Container>
	);
};

export {CabinetPage};
