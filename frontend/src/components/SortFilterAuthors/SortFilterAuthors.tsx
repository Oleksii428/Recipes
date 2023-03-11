import {FC, useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const SortFilterAuthors: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [sort, setSort] = useState<string>("totalLikes");

	useEffect(() => {
		const sortInQuery: string | null = query.get("sort");
		if (sortInQuery) {
			setSort(sortInQuery);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const newValue: string = event.target.value;
		setSort(newValue);
		query.set("sort", newValue);
		navigate({search: query.toString()});
	};

	return (
		<Box sx={{minWidth: 120}}>
			<FormControl fullWidth>
				<InputLabel>Sort</InputLabel>
				<Select
					value={sort}
					label="Sort"
					onChange={handleChange}
				>
					<MenuItem value="totalLikes">Total Likes</MenuItem>
					<MenuItem value="userName">User Name</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export {SortFilterAuthors};
