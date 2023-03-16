import {FC} from "react";
import {Alert, Box, Button, Snackbar, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {createCategoryValidator} from "../../../validators";
import {ICreateCategory} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {categoryActions} from "../../../redux";

const CreateCategory: FC = () => {
	const dispatch = useAppDispatch();
	const {statusCode, errorMessage} = useAppSelector(state => state.categoryReducer);
	const {handleSubmit, control, reset, formState: {isValid}} = useForm<ICreateCategory>({
		resolver: joiResolver(createCategoryValidator),
		mode: "onSubmit"
	});

	const onSubmit: SubmitHandler<ICreateCategory> = (newCategory) => {
		dispatch(categoryActions.createCategory(newCategory));
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
						label="Category Title"
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
					Category has been deleted
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

export {CreateCategory};
