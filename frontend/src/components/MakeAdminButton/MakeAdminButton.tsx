import {FC, useState} from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material";

import {useAppDispatch} from "../../hooks";
import {authorActions} from "../../redux";

interface IProps {
	_id: string;
}

const MakeAdminButton: FC<IProps> = ({_id}) => {
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const makeAdmin = () => {
		dispatch(authorActions.makeAdmin(_id));
		handleClose();
	};

	return (
		<Box>
			<Button variant="contained" onClick={handleOpen}>
				MakeAdmin
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Make admin</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{minWidth: "300px"}}>Are you sure to make author admin?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={makeAdmin}>Make Admin</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export {MakeAdminButton};
