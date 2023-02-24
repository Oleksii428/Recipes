import {FC} from "react";
import {AppBar, Avatar, Box, Container, MenuItem, Toolbar, Typography} from "@mui/material";

const Header: FC = () => {
	return (
		<AppBar position="sticky">
			<Container maxWidth={"xl"}>
				<Toolbar disableGutters>
					<Box sx={{display: "flex", flexGrow: 1}}>
						<MenuItem component="a" href="/">
							<Typography textAlign="center">Home</Typography>
						</MenuItem>
						<MenuItem component="a" href="/recipes">
							<Typography textAlign="center">Recipes</Typography>
						</MenuItem>
						<MenuItem component="a" href="/authors">
							<Typography textAlign="center">Authors</Typography>
						</MenuItem>
					</Box>
					<MenuItem>
						<Avatar component="a" href="/login" src="/broken-image.jpg" />
					</MenuItem>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export {Header};
