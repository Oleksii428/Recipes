import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {FC, SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

const CabinetNavigation: FC = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		console.log(newValue);
		setValue(newValue);
	};

	return (
		<Box
			sx={{flexGrow: 0, bgcolor: "background.paper", display: "flex"}}
		>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{borderRight: 1, borderColor: "divider"}}
			>
				<Tab onClick={() => navigate("profile")} label="Profile" />
				<Tab onClick={() => navigate("my-recipes")} label="My recipes" />
			</Tabs>
		</Box>
	);
};

export {CabinetNavigation};
