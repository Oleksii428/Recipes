import React, {FC, useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {RemoveRounded, AddRounded} from "@mui/icons-material";

const ServingsFilter: FC = () => {
	const [value, setValue] = useState<number>(0);
	const [query] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		setValue(Number(query.get("servings")) || 0);
	}, [query]);

	const handleInc = () => {
		setValue(prevState => prevState + 1);
	};

	const handleDec = () => {
		setValue(prevState => prevState - 1);
	};

	const handelSubmit = () => {
		if (value) {
			query.set("servings", value.toString());
		} else {
			query.delete("servings");
		}
		navigate({search: query.toString()});
	};

	return (
		<Box sx={{display: "flex", justifyContent: "space-between"}}>
			<ButtonGroup
				sx={{display: "flex", columnGap: 1, alignItems: "center", justifyContent: "flex-start"}}
				variant="outlined"
				aria-label="Disabled elevation buttons"
			>
				<Button disabled={!value} onClick={handleDec}>
					<RemoveRounded fontSize="small" />
				</Button>
				<Typography variant="body1">
					{value || "auto"}
				</Typography>
				<Button onClick={handleInc}>
					<AddRounded fontSize="small" />
				</Button>
			</ButtonGroup>
			<Button onClick={handelSubmit}>
				Ok
			</Button>
		</Box>
	);
};

export {ServingsFilter};
