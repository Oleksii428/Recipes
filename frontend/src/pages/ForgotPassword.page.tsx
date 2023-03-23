import {FC, useState} from "react";
import {LockOutlined} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
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

import {useAppDispatch, useAppSelector} from "../hooks";
import {authActions} from "../redux";
import {IForgotData} from "../interfaces";
import {useNavigate} from "react-router-dom";

const ForgotPasswordPage: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [wasTryToSendEmail, setWasTryToSendEmail] = useState<boolean>(false);
	const {loading, errorMessage, statusCode} = useAppSelector(state => state.authReducer);

	const {handleSubmit, control, reset, formState: {isValid}} = useForm<IForgotData>({
		mode: "all"
	});

	const onSubmit: SubmitHandler<IForgotData> = async ({userName}) => {
		await dispatch(authActions.forgotPass({userName}));
		reset();
		setWasTryToSendEmail(true);
	};

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
				{errorMessage && wasTryToSendEmail &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="error">
						{errorMessage}
					</Alert>
				}
				{!errorMessage && statusCode === 200 && wasTryToSendEmail &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="success">
						Check your email
					</Alert>
				}
				<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Forgot Password
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
					<Button
						disabled={!isValid}
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

export {ForgotPasswordPage};
