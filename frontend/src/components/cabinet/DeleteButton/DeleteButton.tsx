import {FC, useEffect, useState} from "react";
import {
	Alert,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Snackbar
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {recipeActions} from "../../../redux";

interface IProps {
	recipeId: string;
}

const DeleteButton: FC<IProps> = ({recipeId}) => {
	const dispatch = useAppDispatch();
	const {deleted} = useAppSelector(state => state.recipeReducer);
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		dispatch(recipeActions.deleteRecipe(recipeId));
	};

	useEffect(() => {
		if (deleted) {
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	}, [deleted]);

	return (
		<Box>
			<IconButton onClick={handleOpen}>
				<Delete color="error" />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Delete</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{minWidth: "300px", mb: 2}}>Delete this recipe?</DialogContentText>
					<Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
			{
				deleted && <div>deleted</div>
			}
			<Snackbar open={deleted} autoHideDuration={6000}>
				<Alert severity="success" sx={{width: "100%"}}>
					Recipe has been deleted
				</Alert>
			</Snackbar>
		</Box>
	);
};

export {DeleteButton};
