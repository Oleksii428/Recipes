import {FC} from "react";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	Typography,
	TextField
} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {joiResolver} from "@hookform/resolvers/joi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

import {signUpValidator} from "../validators";

interface ISignInForm {
	userName: string;
	password: string;
}

const LoginPage: FC = () => {
	const {handleSubmit, control} = useForm<ISignInForm>({
		resolver: joiResolver(signUpValidator),
		mode: "all"
	});

	const onSubmit: SubmitHandler<ISignInForm> = (data) => {
		console.log(data);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
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
								id="email"
								autoComplete="email"
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
