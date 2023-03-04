import {ChangeEvent, FC, useEffect, useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const NameFilter: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [currValue, setCurrValue] = useState<string>(query.get("name") || "");

	useEffect(() => {
		setCurrValue(query.get("name") || "");
	}, [query]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		if (value) {
			setCurrValue(value);
		} else {
			setCurrValue("");
		}
	};

	const handleClick = () => {
		if (currValue) {
			query.set("name", currValue);
		} else {
			query.delete("name");
			setCurrValue("");
		}
		navigate({search: query.toString()});
	};

	return (
		<Box
			sx={{display: "flex", columnGap: 1, alignItems: "flex-end"}}
		>
			<TextField
				sx={{flexGrow: 1}}
				id="standard-basic"
				label="User name"
				value={currValue}
				variant="standard"
				onChange={handleChange}
			/>
			<Button disabled={!currValue} variant="contained" onClick={handleClick}>Ok</Button>
		</Box>
	);
};

export {NameFilter};
