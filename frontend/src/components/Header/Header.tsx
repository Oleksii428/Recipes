import {FC} from "react";
import {AppBar, Box, Container, MenuItem, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../hooks";

const Header: FC = () => {
	const {loginAuthor, loading} = useAppSelector(state => state.authReducer);

	return (
		<AppBar position="static" sx={{mb: 4}}>
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
					{
						loginAuthor?._id && !loading && <h2>Login</h2>
					}
					{
						!loginAuthor?._id && !loading && <a href="/login">Not login</a>
					}
					{/*<Avatar component="a" href="/login" src={`${baseURL}/${loginAuthor.avatar}`} />*/}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export {Header};
