import {FC} from "react";
import {Container, Grid} from "@mui/material";
import {Outlet} from "react-router-dom";

import {UserNavigation, AdminNavigation} from "../components";
import {useAppSelector} from "../hooks";

const CabinetPage: FC = () => {
	const {loginAuthor} = useAppSelector(state => state.authReducer);

	return (
		<Container sx={{columnGap: 3, display: "flex"}} maxWidth={"xl"}>
			<Grid container spacing={2}>
				<Grid item xl={2}>
					{
						loginAuthor?.role === "admin" ?
							<AdminNavigation /> :
							<UserNavigation />
					}
				</Grid>
				<Grid item xl={10}>
					<Outlet />
				</Grid>
			</Grid>
		</Container>
	);
};

export {CabinetPage};
