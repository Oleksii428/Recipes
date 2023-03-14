import {ChangeEvent, FC, useState} from "react";
import {Box, Button, Chip, TextField, Typography} from "@mui/material";
import {FieldError, Merge, UseControllerProps} from "react-hook-form";

import {ICreateRecipe} from "../../../interfaces";

interface IProps extends UseControllerProps<ICreateRecipe> {
	setValue: Function;
	errors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

const IngredientsForm: FC<IProps> = ({setValue, errors}) => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [currentValue, setCurrentValue] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(e.currentTarget.value);
	};

	const handleAddIngredient = () => {
		setIngredients(prevState => [...prevState, currentValue]);
		setValue("ingredients", [...ingredients, currentValue], {shouldValidate: true});
		setCurrentValue("");
	};

	const handleDelIngredient = (item: string, index: number) => {
		ingredients.splice(index, 1);
		setValue("ingredients", ingredients, {shouldValidate: true});
		setIngredients(ingredients);
	};

	return (
		<Box sx={{display: "flex", flexDirection: "column", rowGap: 1}}>
			{
				ingredients.map((ingredient, index) =>
					<Box
						key={index}
						sx={{
							display: "flex",
							alignItems: "center",
							columnGap: 1
						}}
					>
						<Typography variant="body1">{index + 1}: </Typography>
						<Chip
							onDelete={() => handleDelIngredient(ingredient, index)}
							key={index} size="medium"
							label={ingredient}
							color={errors?.length && errors[index]?.message ? "error" : "default"}
						/>
					</Box>
				)}
			<Box sx={{display: "flex", alignItems: "center", columnGap: 1}}>
				<TextField
					error={!!errors}
					value={currentValue}
					onChange={handleChange}
					margin="dense"
					label="Add Ingredient"
				/>
				<Button disabled={!currentValue} onClick={handleAddIngredient} variant="outlined">add</Button>
			</Box>
		</Box>
	);
};

export {IngredientsForm};
