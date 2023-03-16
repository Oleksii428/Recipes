import {FC} from "react";
import {Alert, Box, Button, Snackbar, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createKitchenValidator} from "../../../validators";
import {ICreateKitchen} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {kitchenActions} from "../../../redux";

const CreateKitchen: FC = () => {
	const dispatch = useAppDispatch();
	const {statusCode, errorMessage} = useAppSelector(state => state.kitchenReducer);
	const {handleSubmit, control, reset, formState: {isValid}} = useForm<ICreateKitchen>({
		resolver: joiResolver(createKitchenValidator),
		mode: "onSubmit"
	});

	const onSubmit: SubmitHandler<ICreateKitchen> = (newKitchen) => {
		dispatch(kitchenActions.createKitchen(newKitchen));
		reset();
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
			<Controller
				name={"title"}
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Kitchen Title"
					/>
				)}
			/>
			<Button
				disabled={!isValid}
				type="submit"
				variant="contained"
			>
				Apply
			</Button>
			<Snackbar open={statusCode === 201} autoHideDuration={3000}>
				<Alert severity="success" sx={{width: "100%"}}>
					Kitchen has been deleted
				</Alert>
			</Snackbar>
			<Snackbar open={!!errorMessage} autoHideDuration={3000}>
				<Alert severity="error" sx={{width: "100%"}}>
					{errorMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export {CreateKitchen};
