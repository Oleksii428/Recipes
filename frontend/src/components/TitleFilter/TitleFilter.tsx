import React, {FC} from "react";
import {TextField} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const TitleFilter: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams({});


	return (
		<TextField
			id="standard-basic"
			label="Title"
			value={sessionStorage.getItem("title")}
			variant="standard"
			onChange={(event) => {
				const value = event.target.value;
				if (value) {
					sessionStorage.setItem("title", value);
					setSearchParams((prev) => ({...prev, title: value}));
				} else {
					sessionStorage.removeItem("title");
					searchParams.delete("title");
					setSearchParams(searchParams);
				}
			}} />
	);
};

export {TitleFilter};
