import {FC, SyntheticEvent, useEffect, useMemo, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {FieldError} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {ICategory} from "../../../interfaces";
import {categoryActions} from "../../../redux";

interface IProps {
	setValue: Function;
	errors: FieldError | undefined;
}

const CategoryForm: FC<IProps> = ({setValue, errors}) => {
	const dispatch = useAppDispatch();

	const {categories} = useAppSelector(state => state.categoryReducer);
	const titles = useMemo(() => categories.map(category => category.title), [categories]);
	const [currentValue, setCurrentValue] = useState<string | null>(null);

	useEffect(() => {
		dispatch(categoryActions.getByParams());
	}, [dispatch]);

	const handleChange = (event: SyntheticEvent, value: string): void => {
		if (value) {
			const category: ICategory | undefined = categories.find(category => category.title === value);
			setCurrentValue(value);
			setValue("category", category?._id as string);
		} else {
			setCurrentValue(null);
			setValue("category", "");
		}
	};

	return (
		<Autocomplete
			blurOnSelect
			loading={true}
			options={titles}
			value={currentValue}
			onInputChange={handleChange}
			renderInput={(titles) => (
				<TextField
					error={!!errors}
					helperText={errors?.message}
					{...titles}
					value={currentValue}
					label="Category"
					variant="outlined" />
			)}
		/>
	);
};

export {CategoryForm};
