import {FC, useEffect, useState} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

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
		<Box>
			<ButtonGroup
				disableElevation
				variant="outlined"
				aria-label="Disabled elevation buttons"
			>
				<Button disabled={!value} onClick={handleDec}>-</Button>
				<Button onClick={handleInc}>+</Button>
				{value || "auto"}
			</ButtonGroup>
			<Button onClick={handelSubmit}>
				Ok
			</Button>
		</Box>
	);
};

export {ServingsFilter};
