import {FC, useEffect, useState} from "react";
import {Box, Button, Slider, Typography} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const TimeFilter: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [value, setValue] = useState<number[]>([]);

	useEffect(() => {
		let newValues = [0, 100];
		const time = query.get("time");

		if (time) {
			const [minValue, maxValue] = time.split("-").map(Number);

			if (!isNaN(minValue) && !isNaN(maxValue)) {
				newValues = [minValue, maxValue];
			} else if (!isNaN(minValue)) {
				newValues = [minValue, 100];
			} else if (!isNaN(maxValue)) {
				newValues = [0, maxValue];
			}
		}

		setValue(newValues);
	}, [query]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};

	const handleChangeCommitted = () => {
		const [valueMin, valueMax] = value;
		query.set("time", `${valueMin}-${valueMax}`);
		navigate({search: query.toString()});
	};

	const handleClear = () => {
		query.delete("time");
		navigate({search: query.toString()});
	};

	return (
		<Box sx={{display: "flex", columnGap: 2, alignItems: "center", width: 300}}>
			<Typography variant="h6">
				Time
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				step={10}
				onChangeCommitted={handleChangeCommitted}
				valueLabelDisplay="auto"
			/>
			<Button disabled={value[0] === 0 && value[1] === 100} variant="contained" onClick={handleClear}>Clear</Button>
		</Box>
	);
};

export {TimeFilter};
