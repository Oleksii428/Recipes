import {FC, useEffect, useState} from "react";
import {
	Alert,
	AppBar,
	Avatar,
	Box,
	CircularProgress,
	Container,
	MenuItem,
	Toolbar,
	Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";

const Header: FC = () => {
	const {loginAuthor, loading, tokenData} = useAppSelector(state => state.authReducer);
	const [isLogout, setIsLogout] = useState<boolean>(false);
	const [isLogouted, setIsLogouted] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!tokenData && isLogouted) {
			setIsLogout(true);
			setTimeout(() => {
				setIsLogout(false);
			}, 2000);
		}
	}, [isLogouted, tokenData]);

	const logout = async () => {
		await dispatch(authActions.logout());
		setIsLogouted(true);
	};

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
						loginAuthor && !loading &&
						<Box sx={{display: "flex", alignItems: "center", columnGap: 2}}>
							<Avatar component="a" href="/cabinet" src="static/images/cards/paella.jpg" />
							{/*<Avatar component="a" href="/login" src={`${baseURL}/${loginAuthor.avatar}`} />*/}
							<h2>
								<button onClick={logout}>Logout</button>
							</h2>
						</Box>
					}
					{
						!loginAuthor && !loading && <a href="/login">Login</a>
					}
					{
						loading && <CircularProgress color="inherit" />
					}
				</Toolbar>
			</Container>
			{
				isLogout &&
				<Alert severity="success">
					Success logout
				</Alert>
			}
		</AppBar>
	);
};

export {Header};
