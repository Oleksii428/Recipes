import {FC, useState} from "react";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {
	Avatar,
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	IconButton,
	Link,
	Paper,
	Rating,
	Typography
} from "@mui/material";

import {IRecipe} from "../../interfaces";
import {baseURL} from "../../configs";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {bookActions} from "../../redux";

interface IProps {
	recipe: IRecipe;
}

const Recipe: FC<IProps> = ({recipe}) => {
	const {
		_id,
		category,
		kitchen,
		creator,
		createdAt,
		gallery,
		rating,
		reviewsCount,
		time,
		title,
		bookCount,
		inBook,
		servings
	} = recipe;
	const {avatar, userName} = creator;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.bookReducer);

	const [clickBook, setClickBook] = useState<boolean>(false);
	const [bookCounter, setBookCounter] = useState<number>(bookCount);

	const handleBookInc = async (n: number) => {
		await dispatch(bookActions.bookToggle(_id));
		setClickBook(false);
		setBookCounter(prevState => prevState + n);
	};

	const handleBookDec = async (n: number) => {
		await dispatch(bookActions.bookToggle(_id));
		setClickBook(true);
		setBookCounter(prevState => prevState - n);
	};

	const renderAction = () => {
		if (!loginAuthor) {
			return <IconButton onClick={() => navigate("/login")}>
				<Badge badgeContent={bookCount} color="primary" showZero>
					<BookmarkBorder fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		} else if (loginAuthor && inBook) {
			if (!clickBook) {
				return <IconButton disabled={loading} onClick={() => handleBookDec(1)}>
					<Badge badgeContent={bookCounter} color="primary" showZero>
						<Bookmark fontSize="medium" color="primary" />
					</Badge>
				</IconButton>;
			} else {
				return <IconButton disabled={loading} onClick={() => handleBookInc(1)}>
					<Badge badgeContent={bookCounter} color="primary" showZero>
						<BookmarkBorder fontSize="medium" />
					</Badge>
				</IconButton>;
			}
		} else if (loginAuthor && !inBook) {
			if (clickBook) {
				return <IconButton disabled={loading} onClick={() => handleBookInc(-1)}>
					<Badge badgeContent={bookCounter} color="primary" showZero>
						<Bookmark fontSize="medium" color="primary" />
					</Badge>
				</IconButton>;
			} else {
				return <IconButton disabled={loading} onClick={() => handleBookDec(-1)}>
					<Badge badgeContent={bookCounter} color="primary" showZero>
						<BookmarkBorder fontSize="medium" />
					</Badge>
				</IconButton>;
			}
		}
	};

	return (
		<Grid item xl={3} lg={4} md={5}>
			<Card>
				<CardHeader
					avatar={<Avatar src={avatar ? baseURL + avatar : "/broken-image.jpg"} />}
					title={
						<Typography variant="subtitle1">
							<Link
								href={`/authors/${creator._id}`}>{userName}
							</Link>
						</Typography>
					}
					subheader={createdAt}
					action={renderAction()}
				/>
				<CardContent>
					<Typography variant="h5">
						{title}
						{gallery.length ?
							<CardMedia
								component="img"
								height="200"
								image={gallery.length ? baseURL + gallery[0].path : "static/images/cards/paella.jpg"}
								alt="preview"
								sx={{borderRadius: 5}}
							/> :
							<Paper sx={{height: 200, borderRadius: 5, bgcolor: "grey"}}
							/>
						}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Time: {time}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Category: {category}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Kitchen: {kitchen}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Servings: {servings}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center"}}>
						<Rating name="read-only" value={rating} precision={0.1} readOnly />
						{reviewsCount}
					</Typography>
					<Link href={`/recipes/${_id}`} color="inherit" underline="none">
						<Button variant="contained">
							Details
						</Button>
					</Link>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Recipe};
