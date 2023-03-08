import {FC, useState} from "react";
import {LockOutlined} from "@mui/icons-material";
import {joiResolver} from "@hookform/resolvers/joi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
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
	Alert, InputLabel, Select, MenuItem, FormControl, SelectChangeEvent
} from "@mui/material";

import {signUp} from "../validators";
import {useAppDispatch, useAppSelector} from "../hooks";

interface ISignUpForm {
	userName: string;
	email: string;
	password: string;
	repeatPassword: string;
	adminKey?: string | undefined;
}

const RegisterPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {loading, errorMessage} = useAppSelector(state => state.authReducer);
	const [accountType, setAccountType] = useState<string>("user");

	const {handleSubmit, control, reset} = useForm<ISignUpForm>({
		resolver: joiResolver(signUp),
		mode: "all"
	});

	const handleChange = (event: SelectChangeEvent) => {
		setAccountType(event.target.value);
	};

	const onSubmit: SubmitHandler<ISignUpForm> = async ({userName, email, password, adminKey}) => {
		console.log(userName, email, password, adminKey);
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
				{errorMessage &&
					<Alert sx={{position: "absolute", top: "-45px", width: "100%", boxSizing: "border-box"}}
							 severity="error">
						{errorMessage}
					</Alert>
				}
				<Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<FormControl fullWidth>
					<InputLabel>User type</InputLabel>
					<Select
						value={accountType}
						label="User Type"
						onChange={handleChange}
					>
						<MenuItem value="user">User</MenuItem>
						<MenuItem value="admin">Admin</MenuItem>
					</Select>
				</FormControl>
				<Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name={"userName"}
						control={control}
						rules={{required: "User Name is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
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
						name={"email"}
						control={control}
						rules={{required: "Email is required"}}
						render={({field: {onChange, value}, fieldState: {error}}) => (
							<TextField
								required
								error={!!error}
								helperText={error?.message}
								onChange={onChange}
								value={value || ""}
								label="Email"
								margin="normal"
								fullWidth
							/>
						)}
					/>
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
					{
						accountType === "admin" &&
						<Controller
							shouldUnregister={true}
							name={"adminKey"}
							control={control}
							rules={{required: "Admin key is required"}}
							defaultValue=""
							render={({field: {onChange, value}, fieldState: {error}}) => (
								<TextField
									required={accountType === "admin"}
									error={!!error}
									helperText={error?.message}
									onChange={onChange}
									value={value || ""}
									label="Admin Key"
									margin="normal"
									fullWidth
									type="password"
								/>)}
						/>
					}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{mt: 3, mb: 2}}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href={"/login"} variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
export {RegisterPage};
