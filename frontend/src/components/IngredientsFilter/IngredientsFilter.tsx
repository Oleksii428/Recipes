import React, {FC, useEffect, useState} from "react";
import {Chip, FormControl, Input, Paper} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const IngredientsFilter: FC = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState<string[]>([]);
	const [currValue, setCurrValue] = useState<string>("");
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const prev = searchParams.get("ingredients");
		if (prev) {
			setValues(prev.split(","));
		}
	}, []);

	useEffect(() => {
		if (values.length) {
			searchParams.set("ingredients", values.join(","));
			navigate({search: searchParams.toString()});
		} else {
			searchParams.delete("ingredients");
			navigate({search: searchParams.toString()});
		}
	}, [navigate, values]);

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (currValue) {
				setValues((oldState) => [...oldState, currValue]);
				setCurrValue("");
			}
		}
		if (e.key === "Backspace") {
			if (values.length && !currValue) {
				setValues((oldState) => (oldState.slice(0, -1)));
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrValue(e.currentTarget.value);
	};

	const handleDelete = (item: string, index: number) => {
		let arr = [...values];
		arr.splice(index, 1);
		setValues(arr);
	};

	return (
		<FormControl>
			{!!values.length &&
				<Paper
					sx={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						listStyle: "none",
						p: 1,
						m: 0
					}}
					component="ul"
				>
					{values.map((item, index) => (
						<Chip
							key={index}
							size="small"
							sx={{mr: 1, mb: 1}}
							label={item}
							onDelete={() => handleDelete(item, index)}
						/>
					))}
				</Paper>
			}
			<Input
				value={currValue}
				placeholder="Add ingredient"
				onChange={handleChange}
				onKeyDown={handleKeyUp}
			/>
		</FormControl>
	);
};

export {IngredientsFilter};
