import {FC, useEffect, useState} from "react";
import {LockOutlined} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
	Alert,
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Link,
	TextField,
	Typography
} from "@mui/material";

import {IRestoreData} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../hooks";
import {restore} from "../validators";
import {authActions} from "../redux";

interface IRestorePassForm extends IRestoreData {
	repeatPassword: string;
}

const RestorePasswordPage: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const dispatch = useAppDispatch();
	const [wasTryToRestore, setWasTryToRestore] = useState<boolean>(false);
	const {loading, errorMessage, statusCode} = useAppSelector(state => state.authReducer);

	const {handleSubmit, control, reset} = useForm<IRestorePassForm>({
		resolver: joiResolver(restore),
		mode: "all"
	});

	const onSubmit: SubmitHandler<IRestorePassForm> = async ({password}) => {
		const token = query.get("token");
		if (token) {
			await dispatch(authActions.restorePass({password, token}));
		}
		setWasTryToRestore(true);
	};

	useEffect(() => {
		if (!errorMessage && statusCode === 200 && wasTryToRestore) {
			reset();
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	}, [errorMessage, navigate, reset, statusCode, wasTryToRestore]);

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
				{errorMessage && wasTryToRestore &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="error">
						{errorMessage}
					</Alert>
				}
				{statusCode === 200 && wasTryToRestore &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="success">
						Password has been restored
					</Alert>
				}
				<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Restore Password
				</Typography>
				<Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name={"password"}
						control={control}
						rules={{required: "Password is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Password"
								margin="normal"
								fullWidth
								type="password"
							/>
						)}
					/>
					<Controller
						name={"repeatPassword"}
						control={control}
						rules={{required: "Repeat Password is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Repeat Password"
								margin="normal"
								fullWidth
								type="password"
							/>
						)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Send email
					</Button>
					<Grid container>
						<Grid item xs>
							<Link sx={{cursor: "pointer"}} onClick={() => navigate("/login")}>Already have an account?</Link>
						</Grid>
						<Grid item>
							<Link sx={{cursor: "pointer"}} onClick={() => navigate("/register")}>Don't have an account?</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>

	);
};

export {RestorePasswordPage};
