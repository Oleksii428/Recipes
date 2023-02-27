import {ChangeEvent, FC, useEffect, useState} from "react";
import {TextField} from "@mui/material";

import {useNavigate} from "react-router-dom";
import {useAppLocation} from "../../hooks";

const TitleFilter: FC = () => {
	const location = useAppLocation();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams(location.search));
	const [currValue, setCurrValue] = useState<string>(searchParams.get("title") ?? "");

	useEffect(() => {
		setSearchParams(new URLSearchParams(location.search));
	}, [location.search]);

	useEffect(() => {
		setCurrValue(searchParams.get("title") ?? "");
	}, [searchParams]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		if (value) {
			searchParams.set("title", value);
			navigate({search: searchParams.toString()});
			setCurrValue(value);
		} else {
			searchParams.delete("title");
			navigate({search: searchParams.toString()});
			setCurrValue("");
		}
		setSearchParams(searchParams);
	};

	return (
		<TextField
			id="standard-basic"
			label="Title"
			value={currValue}
			variant="standard"
			onChange={handleChange}
		/>
	);
};

export {TitleFilter};
