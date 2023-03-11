import {FC, useEffect, useState} from "react";
import {
	Backdrop,
	Box,
	Button, CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField
} from "@mui/material";
import {ReportProblem} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {reportValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {reportActions} from "../../redux";
import {useNavigate} from "react-router-dom";

interface IProps {
	authorId: string;
	isReport: Function;
}

interface IReport {
	text: string;
}

const ReportButton: FC<IProps> = ({authorId, isReport}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const {handleSubmit, control, reset} = useForm<IReport>({
		resolver: joiResolver(reportValidator),
		mode: "all"
	});

	const {loading, statusCode} = useAppSelector(state => state.reportReducer);
	const {loginAuthor} = useAppSelector(state => state.authReducer);

	const onSubmit: SubmitHandler<IReport> = ({text}) => {
		dispatch(reportActions.sendReport({authorId, text}));
		handleClose();
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (statusCode === 200) {
			isReport(true);
			reset();
		}
	}, [isReport, reset, statusCode]);

	return (
		<Box>
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{
				loginAuthor ?
					<IconButton onClick={handleOpen}>
						<ReportProblem color="warning" />
					</IconButton> :
					<IconButton onClick={() => navigate("/login")}>
						<ReportProblem color="warning" />
					</IconButton>
			}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Report</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{minWidth: "300px"}}>Write details about problem</DialogContentText>
					<Box component="form" id="report-form" noValidate onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name={"text"}
							control={control}
							render={({field: {onChange, value}, fieldState: {error}}) => (
								<TextField
									error={!!error}
									helperText={error?.message}
									onChange={onChange}
									value={value || ""}
									autoFocus
									required
									margin="dense"
									label="Description"
									type="text"
									fullWidth
									variant="standard"
								/>
							)}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button form="report-form" type="submit">Send</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export {ReportButton};
