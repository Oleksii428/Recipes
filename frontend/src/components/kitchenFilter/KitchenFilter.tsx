import {FC, SyntheticEvent, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {Autocomplete, TextField} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {kitchenActions} from "../../redux";

const KitchenFilter: FC = () => {
	const dispatch = useAppDispatch();
	const {kitchens} = useAppSelector(state => state.kitchenReducer);
	const titles = kitchens.map(kitchen => kitchen.title);
	const [query] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(kitchenActions.getByParams());
	}, [dispatch]);

	const handleChange = (e: SyntheticEvent, newValue: string | null) => {
		if (newValue) {
			query.set("kitchen", newValue);
			navigate({search: query.toString()});
		} else {
			query.delete("kitchen");
			navigate({search: query.toString()});
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
