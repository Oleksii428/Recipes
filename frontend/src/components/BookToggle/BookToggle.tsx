import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Badge, Box, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {bookActions} from "../../redux";

interface IProps {
	_id: string;
	bookCount: number;
	inBook: boolean | undefined;
	setBook: Function;
	setBookCount: Function;
}

const BookToggle: FC<IProps> = ({_id, bookCount, inBook, setBook, setBookCount}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.bookReducer);

	const handleBookInc = async () => {
		await dispatch(bookActions.bookToggle(_id));
		setBookCount(bookCount + 1);
		setBook(true);
	};

	const handleBookDec = async () => {
		await dispatch(bookActions.bookToggle(_id));
		setBookCount(bookCount - 1);
		setBook(false);
	};

	function renderAction() {
		if (!loginAuthor) {
			return <IconButton onClick={() => navigate("/login")}>
				<Badge badgeContent={bookCount} color="primary" showZero>
					<BookmarkBorder fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		} else if (inBook) {
			return <IconButton disabled={loading} onClick={handleBookDec}>
				<Badge badgeContent={bookCount} color="primary" showZero>
					<Bookmark fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		} else {
			return <IconButton disabled={loading} onClick={handleBookInc}>
				<Badge badgeContent={bookCount} color="primary" showZero>
					<BookmarkBorder fontSize="medium" />
				</Badge>
			</IconButton>;
		}
	}

	return (
		renderAction() ?? <Box>Book toggle</Box>
	);
};

export {BookToggle};
