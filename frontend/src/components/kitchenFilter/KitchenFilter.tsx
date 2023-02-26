import {FC, SyntheticEvent, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Autocomplete, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {kitchenActions} from "../../redux";

const KitchenFilter: FC = () => {
	const dispatch = useAppDispatch();
	const {kitchens} = useAppSelector(state => state.kitchenReducer);
	const titles = kitchens.map(kitchen => kitchen.title);
	const [query] = useSearchParams({});
	const location = useAppLocation();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(kitchenActions.getByParams());
	}, [dispatch]);

	const handleChange = (e: SyntheticEvent, newValue: string | null) => {
		if (newValue) {
			const searchParams: URLSearchParams = new URLSearchParams(location.search);
			searchParams.set("kitchen", newValue);
			navigate({search: searchParams.toString()});
		} else {
			const searchParams = new URLSearchParams(location.search);
			searchParams.delete("kitchen");
			navigate({search: searchParams.toString()});
		}
	};

	return (
		<Autocomplete
			blurOnSelect
			loading={true}
			options={titles}
			renderInput={(titles) => (
				<TextField {...titles} label="Kitchen" variant="standard" />
			)}
			value={query.get("kitchen")}
			onChange={handleChange}
		/>
	);
};

export {KitchenFilter};
