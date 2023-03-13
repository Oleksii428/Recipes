import {ChangeEvent, FC, useState} from "react";
import {Alert, Backdrop, Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {changeUserName, imageValidator} from "../../../validators";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions, authorActions} from "../../../redux";

interface IChangeUserName {
	userName?: string;
	avatar?: File;
}

const ProfileSettings: FC = () => {
	const dispatch = useAppDispatch();
	const {loading, statusCode, errorMessage} = useAppSelector(state => state.authorReducer);

	const {handleSubmit, control, reset} = useForm<IChangeUserName>({
		resolver: joiResolver(changeUserName),
		mode: "onSubmit"
	});

	const [avatar, setAvatar] = useState<File | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [avatarError, setAvatarError] = useState<string | undefined>("");

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		const photo = event.target.files![0];
		setAvatarError(imageValidator(photo));
		setAvatar((event.target as HTMLInputElement).files![0]);
	};

	const onSubmit: SubmitHandler<IChangeUserName> = async ({userName}) => {
		if (userName) {
			await dispatch(authorActions.changeUserName({userName}));
			reset();
		}
		if (avatar && !avatarError) {
			await dispatch(authorActions.uploadAvatar({avatar}));
			setAvatar(null);
		}
		dispatch(authActions.isLogin());
	};

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				margin: "0 auto",
				rowGap: 1
			}}
		>
			{
				(statusCode === 200 || statusCode === 201) &&
				<Alert
					severity="success">
					Changes complete
				</Alert>
			}
			{
				errorMessage &&
				<Alert
					severity="error">
					{errorMessage}
				</Alert>
			}
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Controller
				name={"avatar"}
				control={control}
				render={({field: {onChange}}) => (
					<Box sx={{display: "flex", flexDirection: "column", alignItems: "center", rowGap: 1}}>
						<input
							accept="image/jpeg, image/png, image/webp"
							type="file"
							onChange={event => {
								onChange();
								handleChangeAvatar(event);
							}}
							id="icon-button-avatar"
							style={{display: "none"}}
						/>
						{!avatar && <label htmlFor="icon-button-avatar">
							<Box
								sx={{
									boxSizing: "border-box",
									border: "2px dotted black",
									cursor: "pointer",
									padding: 2
								}}
							>
								<Typography variant="body1">
									Upload Avatar
								</Typography>
							</Box>
						</label>}
						{avatar &&
							<Box sx={{
								position: "relative",
								width: "150px",
								height: "150px",
								overflow: "hidden",
								borderRadius: "50%"
							}}>
								<Box
									component="img"
									src={URL.createObjectURL(avatar)}
									sx={{
										position: "absolute",
										width: "100%",
										height: "100%",
										objectFit: "cover",
										top: 0,
										left: 0
									}}
								/>
							</Box>
						}
						{
							avatar && avatarError &&
							<Alert severity="error">
								{avatarError}
							</Alert>
						}
						{
							avatar &&
							<Button variant="outlined" onClick={() => setAvatar(null)}>Remove</Button>
						}
					</Box>
				)}
			/>
			<Controller
				name={"userName"}
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={(event) => {
							setUserName(event.target.value);
							onChange(event);
						}}
						margin="dense"
						label="Change User Name"
					/>
				)}
			/>
			<Button
				disabled={(!avatar && !userName) || !!avatarError}
				type="submit"
				variant="contained"
			>
				Apply
			</Button>
		</Box>
	);
};

export {ProfileSettings};
