import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import {kitchenActions} from "../../redux";
import {Autocomplete, TextField} from "@mui/material";

const KitchenFilter: FC = () => {
	const dispatch = useAppDispatch();
	const {kitchens} = useAppSelector(state => state.kitchenReducer);
	const titles = kitchens.map(kitchen => kitchen.title);
	const [searchParams, setSearchParams] = useSearchParams({});

	useEffect(() => {
		dispatch(kitchenActions.getByParams());
	}, [dispatch]);

	return (
		<Autocomplete
			blurOnSelect
			loading={true}
			options={titles}
			renderInput={(titles) => (
				<TextField {...titles} label="Kitchen" variant="standard" />
			)}
			value={sessionStorage.getItem("kitchen")}
			onChange={(event: any, newValue) => {
				if (newValue) {
					sessionStorage.setItem("kitchen", newValue);
					setSearchParams((prev) => ({...prev, kitchen: newValue}));
				} else {
					sessionStorage.removeItem("kitchen");
					searchParams.delete("kitchen");
					setSearchParams(searchParams);
				}
			}}
		/>
	);
};

export {KitchenFilter};
