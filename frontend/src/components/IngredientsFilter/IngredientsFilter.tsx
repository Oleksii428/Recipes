import {ChangeEvent, FC, KeyboardEvent, useEffect, useState} from "react";
import {Chip, FormControl, Input, Paper} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const IngredientsFilter: FC = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState<string[]>([]);
	const [currValue, setCurrValue] = useState<string>("");
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const prev = searchParams.get("ingredients");
		setValues(prev ? prev.split(",") : []);
	}, [searchParams]);

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && currValue) {
			const newValues = [...values, currValue];

			searchParams.set("ingredients", newValues.join(","));
			navigate({search: searchParams.toString()});

			setCurrValue("");
		} else if (e.key === "Backspace" && !currValue && values.length) {
			const newValues = values.slice(0, -1);

			if (newValues.length) {
				searchParams.set("ingredients", newValues.join(","));
			} else {
				searchParams.delete("ingredients");
			}

			navigate({search: searchParams.toString()});
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrValue(e.currentTarget.value);
	};

	const handleDelete = (item: string, index: number) => {
		values.splice(index, 1);

		if (values.length) {
			searchParams.set("ingredients", values.join(","));
		} else {
			searchParams.delete("ingredients");
		}

		navigate({search: searchParams.toString()});
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
