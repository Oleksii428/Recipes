import {ChangeEvent, FC, useEffect, useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const TitleFilter: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [currValue, setCurrValue] = useState<string>(query.get("title") || "");

	useEffect(() => {
		setCurrValue(query.get("title") || "");
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
			query.set("title", currValue);
		} else {
			query.delete("title");
			setCurrValue("");
		}
		navigate({search: query.toString()});
	};

	return (
		<Box
			sx={{display: "flex", alignItems: "flex-end"}}
		>
			<TextField
				sx={{flexGrow: 1}}
				id="standard-basic"
				label="Title"
				value={currValue}
				variant="standard"
				onChange={handleChange}
			/>
			<Button onClick={handleClick}>Ok</Button>
		</Box>
	);
};

export {TitleFilter};
