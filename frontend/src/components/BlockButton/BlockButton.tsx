import {FC, useEffect, useState} from "react";
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	DialogContentText,
	DialogTitle,
	IconButton
} from "@mui/material";
import {RemoveCircle} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {blockActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {blockValidator} from "../../validators";

interface IProps {
	authorId: string;
	isBlock: Function;
}

interface IBlock {
	days: number;
}

const BlockButton: FC<IProps> = ({authorId, isBlock}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const {loading, statusCode} = useAppSelector(state => state.blockReducer);

	const {handleSubmit, control, reset} = useForm<IBlock>({
		resolver: joiResolver(blockValidator),
		mode: "all"
	});
	const onSubmit: SubmitHandler<IBlock> = ({days}) => {
		dispatch(blockActions.blockAuthor({authorId, days}));
		handleClose();
		reset();
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (statusCode === 200) {
			isBlock(true);
			reset();
		}
	}, [isBlock, reset, statusCode]);

	return (
		<Box>
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<IconButton onClick={handleOpen}>
				<RemoveCircle color="error" />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Block</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{minWidth: "300px"}}>Block author</DialogContentText>
					<Box component="form" id="block-form" noValidate onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name={"days"}
							control={control}
							render={({field: {onChange, value}, fieldState: {error}}) => (
								<TextField
									type="number"
									error={!!error}
									helperText={error?.message}
									onChange={onChange}
									value={value || ""}
									autoFocus
									required
									margin="dense"
									label="Days"
									fullWidth
									variant="standard"
								/>
							)}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button form="block-form" type="submit">Block</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export {BlockButton};
