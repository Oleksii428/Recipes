import {FC} from "react";
import {Avatar, Box, Button, Rating, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

import {IReview} from "../../../interfaces";
import {baseURL} from "../../../configs";
import {getPrettyDate} from "../../../helpers";

interface IProps {
	review: IReview;
}

const Review: FC<IProps> = ({review}) => {
	const {photo, rating, text, owner, createdAt} = review;

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			rowGap: 0.5,
			pb: 2,
			borderBottom: 1,
			borderBottomColor: "lightgray"
		}}>
			<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", columnGap: 2}}>
				<Box sx={{display: "flex", alignItems: "center", columnGap: 2}}>
					<Avatar src={owner.avatar ? baseURL + owner.avatar : "/broken-image.jpg"} />
					<Typography variant="h6">{owner.userName}</Typography>
				</Box>
				<Button>
					<Delete fontSize="medium" />
				</Button>
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
