import {FC} from "react";
import {Box, Button, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ICreateRecipe} from "../../../interfaces";
import {createRecipeValidator} from "../../../validators";
import {IngredientsForm} from "../IngredientsForm/IngredientsForm";
import {CategoryForm} from "../CategoryForm/CategoryForm";
import {KitchenForm} from "../KitchenForm/KitchenForm";

const CreateRecipeForm: FC = () => {
	const {handleSubmit, control, setValue, formState: {errors, isValid}} = useForm<ICreateRecipe>({
		resolver: joiResolver(createRecipeValidator),
		mode: "onSubmit"
	});

	const onSubmit: SubmitHandler<ICreateRecipe> = (newRecipeData) => {
		console.log(newRecipeData);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={{
				display: "flex",
				flexDirection: "column",
				rowGap: 1,
				pb: 3
			}}>
			<Controller
				name="title"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Title"
					/>
				)}
			/>
			<Controller
				name="time"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						type="number"
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Total time (min)"
					/>
				)}
			/>
			<Controller
				name="servings"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						type="number"
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Servings count"
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Description"
					/>
				)}
			/>
			<CategoryForm errors={errors.category} setValue={setValue} />
			<KitchenForm setValue={setValue} errors={errors.kitchen} />
			<IngredientsForm setValue={setValue} name="ingredients" errors={errors.ingredients} />
			<Button disabled={!isValid} type="submit" variant="contained">Create</Button>
		</Box>
	);
};

export {CreateRecipeForm};
