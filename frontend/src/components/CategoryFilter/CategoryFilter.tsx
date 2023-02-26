import {FC, SyntheticEvent, useEffect} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {categoryActions} from "../../redux";

const CategoryFilter: FC = () => {
	const dispatch = useAppDispatch();
	const {categories} = useAppSelector(state => state.categoryReducer);
	const titles = categories.map(category => category.title);
	const [query] = useSearchParams({});
	const location = useAppLocation();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(categoryActions.getByParams());
	}, [dispatch]);

	const handleChange = (e: SyntheticEvent, newValue: string | null) => {
		if (newValue) {
			const searchParams: URLSearchParams = new URLSearchParams(location.search);
			searchParams.set("category", newValue);
			navigate({search: searchParams.toString()});
		} else {
			const searchParams: URLSearchParams = new URLSearchParams(location.search);
			searchParams.delete("category");
			navigate({search: searchParams.toString()});
		}
	};

	return (
		<Autocomplete
			blurOnSelect
			loading={true}
			options={titles}
			renderInput={(titles) => (
				<TextField {...titles} label="Category" variant="standard" />
			)}
			value={query.get("category")}
			onChange={handleChange}
		/>
	);
};

export {CategoryFilter};
