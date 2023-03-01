import {ChangeEvent, FC, KeyboardEvent, useEffect, useState} from "react";
import {Chip, FormControl, Input, Paper} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const IngredientsFilter: FC = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState<string[]>([]);
	const [mounted, setMounted] = useState<boolean>(false);
	const [currValue, setCurrValue] = useState<string>("");
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const prev = searchParams.get("ingredients");
		if (prev) {
			console.log("set values", prev);
			setValues(prev.split(","));
		}
		setMounted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (mounted && values.length) {
			console.log("nav");
			searchParams.set("ingredients", values.join(","));
			navigate({search: searchParams.toString()});
		} else if (mounted && !values.length) {
			console.log("nav2");
			searchParams.delete("ingredients");
			navigate({search: searchParams.toString()});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, values]);

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
