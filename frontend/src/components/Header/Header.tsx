import {FC, useEffect, useState} from "react";
import {
	Alert,
	AppBar,
	Avatar,
	Box,
	CircularProgress,
	Container,
	IconButton,
	MenuItem,
	Toolbar,
	Typography
} from "@mui/material";
import {Logout} from "@mui/icons-material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux";
import {useNavigate} from "react-router-dom";


const Header: FC = () => {
	const {loginAuthor, loading, tokenData} = useAppSelector(state => state.authReducer);
	const [isLogout, setIsLogout] = useState<boolean>(false);
	const [wasTryToLogout, setWasTryToLogout] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!tokenData && wasTryToLogout) {
			setIsLogout(true);
			setTimeout(() => {
				setIsLogout(false);
			}, 2000);
		}
	}, [wasTryToLogout, tokenData]);

	const logout = async () => {
		await dispatch(authActions.logout());
		dispatch(authActions.cleanLoginAuthor());
		setWasTryToLogout(true);
	};

	const handleNav = (to: string): void => {
		navigate(to);
	};

	return (
		<AppBar position="static" sx={{mb: 4}}>
			<Container maxWidth={"xl"}>
				<Toolbar disableGutters>
					<Box sx={{display: "flex", flexGrow: 1}}>
						<MenuItem onClick={() => handleNav("/")}>
							<Typography textAlign="center">Home</Typography>
						</MenuItem>
						<MenuItem onClick={() => handleNav("/recipes")}>
							<Typography textAlign="center">Recipes</Typography>
						</MenuItem>
						<MenuItem onClick={() => handleNav("/authors")}>
							<Typography textAlign="center">Authors</Typography>
						</MenuItem>
					</Box>
					<Box sx={{display: "flex", columnGap: 2}}>
						{
							!loginAuthor && !loading &&
							<MenuItem onClick={() => handleNav("/login")}>
								<Typography textAlign="center">Login</Typography>
							</MenuItem>
						}
						{
							loginAuthor && !loading &&
							<MenuItem onClick={() => handleNav("/cabinet")}>
								<Typography textAlign="center">{loginAuthor.userName}</Typography>
							</MenuItem>
						}
						<MenuItem>
							{
								loginAuthor && loginAuthor?.avatar && !loading &&
								<Avatar onClick={() => handleNav("/cabinet")} src={loginAuthor.avatar} />
							}
							{
								loginAuthor && !loginAuthor?.avatar && !loading &&
								<Avatar onClick={() => handleNav("/cabinet")} src="static/images/cards/paella.jpg" />
							}
							{
								!loginAuthor && !loading &&
								<Avatar onClick={() => handleNav("/login")} src="static/images/cards/paella.jpg" />
							}
						</MenuItem>
						{
							loginAuthor && !loading &&
							<IconButton onClick={logout}>
								<Logout sx={{color: "white"}} />
							</IconButton>
						}
					</Box>
					{
						loading && <CircularProgress color="inherit" />
					}
				</Toolbar>
			</Container>
			{
				isLogout && wasTryToLogout &&
				<Alert severity="success">
					Success logout
				</Alert>
			}
		</AppBar>
	);
};

export {Header};
