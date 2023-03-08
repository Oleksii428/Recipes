import {FC, useEffect} from "react";
import {LockOutlined} from "@mui/icons-material";
import {joiResolver} from "@hookform/resolvers/joi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	Typography,
	TextField,
	Backdrop,
	CircularProgress,
	Alert
} from "@mui/material";

import {signIn} from "../validators";
import {ILoginData} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../hooks";
import {authActions} from "../redux";

const LoginPage: FC = () => {
	const {handleSubmit, control, reset} = useForm<ILoginData>({
		resolver: joiResolver(signIn),
		mode: "all"
	});
	const dispatch = useAppDispatch();
	const [query] = useSearchParams();
	const {loading, errorMessage, tokenData} = useAppSelector(state => state.authReducer);
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<ILoginData> = async ({userName, password}) => {
		await dispatch(authActions.login({userName, password}));
	};

	useEffect(() => {
		if (tokenData && !errorMessage) {
			reset();
			setTimeout(() => {
				navigate("/recipes");
			}, 2000);
		}
	}, [errorMessage, navigate, reset, tokenData]);

	return (
		<Container component="main" maxWidth="xs">
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative"
				}}
			>
				{errorMessage &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="error">
						{errorMessage}
					</Alert>
				}
				{
					tokenData && !errorMessage &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="success">
						Success login
					</Alert>
				}
				{
					query.has("expSession") && !tokenData && !errorMessage &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="warning">
						Expired session
					</Alert>
				}
				<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name={"userName"}
						control={control}
						rules={{required: "User Name is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="User Name"
								margin="normal"
								fullWidth
								autoFocus
							/>
						)}
					/>
					<Controller
						name={"password"}
						control={control}
						rules={{required: "Password is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Password"
								margin="normal"
								fullWidth
								id="password"
								autoComplete="password"
							/>
						)}
					/>
					<Button
						disabled={!!tokenData}
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href={"/forgot-password"} variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href={"/register"} variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
export {LoginPage};
