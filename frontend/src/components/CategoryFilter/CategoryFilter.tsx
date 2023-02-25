import React, {FC, useEffect} from "react";
import {Autocomplete, TextField} from "@mui/material";
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {categoryActions} from "../../redux";

const CategoryFilter: FC = () => {
	const dispatch = useAppDispatch();
	const {categories} = useAppSelector(state => state.categoryReducer);
	const titles = categories.map(category => category.title);
	const [searchParams, setSearchParams] = useSearchParams({});

	useEffect(() => {
		dispatch(categoryActions.getByParams());
	}, [dispatch]);

	return (
		<Autocomplete
			blurOnSelect
			loading={true}
			options={titles}
			renderInput={(titles) => (
				<TextField {...titles} label="Category" variant="standard" />
			)}
			value={sessionStorage.getItem("category")}
			onChange={(event: any, newValue) => {
				if (newValue) {
					sessionStorage.setItem("category", newValue);
					setSearchParams((prev) => ({...prev, category: newValue}));
				} else {
					sessionStorage.removeItem("category");
					searchParams.delete("category");
					setSearchParams(searchParams);
				}
			}}
		/>
	);
};

export {CategoryFilter};
