import {FC} from "react";
import {Box, Button, Rating, Typography} from "@mui/material";
import {BookToggle} from "../../BookToggle/BookToggle";
import {getPrettyDate} from "../../../helpers";
import {useNavigate} from "react-router-dom";

interface IProps {
	_id: string;
	title: string;
	description: string;
	rating: number;
	reviewsCount: number;
	bookCount: number;
	inBook: boolean | undefined;
	creator: {
		_id: string,
		avatar: string | null,
		userName: string
	};
	createdAt: string;
}

const RecipeInfo: FC<IProps> = (recipe) => {
	const {
		_id,
		title,
		description,
		rating,
		reviewsCount,
		creator,
		createdAt
	} = recipe;

	const navigate = useNavigate();

	return (
		<Box sx={{maxWidth: "500px"}}>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<Typography variant="h2" fontWeight={600}>
					{title}
				</Typography>
				<BookToggle _id={_id} />
			</Box>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<Rating name="read-only" value={rating} precision={0.1} readOnly />
				{rating} | Reviews count: {reviewsCount}
			</Box>
			<Typography variant="body1" fontWeight={700}>
				description: {description}
			</Typography>
			<Typography>
				By <Button onClick={() => navigate(`/authors/${creator._id}`)}>{creator.userName}</Button> | Created
				on {getPrettyDate(createdAt)}
			</Typography>
		</Box>
	);
};

export {RecipeInfo};
