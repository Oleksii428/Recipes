import {FC} from "react";
import {Box, Button, Link, Rating, Typography} from "@mui/material";
import {BookmarkBorder} from "@mui/icons-material";

interface IProps {
	title: string;
	description: string;
	rating: number;
	reviewsCount: number;
	bookCount: number;
	creator: {
		_id: string,
		avatar: string | null,
		userName: string
	};
	createdAt: string;
}

const RecipeInfo: FC<IProps> = ({title, description, rating, reviewsCount, bookCount, creator, createdAt}) => {
	return (
		<Box>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<Typography variant="h2" fontWeight={600}>
					{title}
				</Typography>
				<Button>
					<BookmarkBorder fontSize="large" />
				</Button>
				| {bookCount}
			</Box>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<Rating name="read-only" value={rating} precision={0.1} readOnly />
				{rating} | Reviews count: {reviewsCount}
			</Box>
			<Typography variant="body1" fontWeight={700}>
				description: {description}
			</Typography>
			<Typography>
				By <Link href={`/authors/${creator._id}`}>{creator.userName}</Link> | Created on {createdAt}
			</Typography>
		</Box>
	);
};

export {RecipeInfo};
