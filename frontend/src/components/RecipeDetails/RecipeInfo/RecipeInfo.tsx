import {FC, useState} from "react";
import {Box, Link, Rating, Typography} from "@mui/material";
import {BookToggle} from "../../BookToggle/BookToggle";
import {getPrettyDate} from "../../../helpers";

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
		bookCount,
		inBook,
		creator,
		createdAt
	} = recipe;

	const [bookState, setBookState] = useState<boolean | undefined>(inBook);
	const [bookCountState, setBookCountState] = useState<number>(bookCount);

	return (
		<Box>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<Typography variant="h2" fontWeight={600}>
					{title}
				</Typography>
				<BookToggle
					_id={_id}
					inBook={bookState}
					bookCount={bookCountState}
					setBook={setBookState}
					setBookCount={setBookCountState}
				/>
			</Box>
			<Box sx={{display: "flex", alignItems: "center"}}>
				<Rating name="read-only" value={rating} precision={0.1} readOnly />
				{rating} | Reviews count: {reviewsCount}
			</Box>
			<Typography variant="body1" fontWeight={700}>
				description: {description}
			</Typography>
			<Typography>
				By <Link href={`/authors/${creator._id}`}>{creator.userName}</Link> | Created on {getPrettyDate(createdAt)}
			</Typography>
		</Box>
	);
};

export {RecipeInfo};
