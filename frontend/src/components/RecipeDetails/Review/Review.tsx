import {FC} from "react";
import {Avatar, Backdrop, Box, CircularProgress, IconButton, Rating, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {IReview} from "../../../interfaces";
import {baseURL} from "../../../configs";
import {getPrettyDate} from "../../../helpers";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {reviewActions} from "../../../redux";

interface IProps {
	review: IReview;
	setDeletedReview: Function;
}

const Review: FC<IProps> = ({review, setDeletedReview}) => {
	const dispatch = useAppDispatch();
	const {_id, photo, rating, text, owner, createdAt} = review;

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.reviewReducer);

	const handleDelete = () => {
		dispatch(reviewActions.deleteReview(_id));
		setDeletedReview(_id);
	};

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			rowGap: 0.5,
			pb: 2,
			borderBottom: 1,
			borderBottomColor: "lightgray"
		}}>
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", columnGap: 2}}>
				<Box sx={{display: "flex", alignItems: "center", columnGap: 2}}>
					<Avatar src={owner.avatar ? baseURL + owner.avatar : "/broken-image.jpg"} />
					<Typography variant="h6">{owner.userName}</Typography>
				</Box>
				{
					(loginAuthor?._id === owner._id || loginAuthor?.role === "admin") &&
					<IconButton onClick={handleDelete}>
						<Delete fontSize="medium" color="primary" />
					</IconButton>
				}
			</Box>
			<Box sx={{display: "flex", alignItems: "center", columnGap: 2}}>
				<Rating name="read-only" value={rating} precision={1} readOnly />
				<Typography variant="overline">{getPrettyDate(createdAt)}</Typography>
			</Box>
			<Box sx={{display: "flex", columnGap: 2, maxWidth: 400}}>
				{photo &&
					<Box
						sx={{
							flexShrink: 0,
							position: "relative",
							height: 100,
							width: 100
						}}
					>
						<Box
							component="img"
							src={`${baseURL}/${photo}`}
							sx={{
								position: "absolute",
								width: "100%",
								height: "100%",
								top: 0,
								left: 0,
								objectFit: "cover"
							}}
						/>
					</Box>
				}
				<Typography variant="body1">{text}</Typography>
			</Box>
		</Box>
	);
};

export {Review};
