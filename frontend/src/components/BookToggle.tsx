import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Badge, Box, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";

import {useAppDispatch, useAppSelector} from "../hooks";
import {bookActions} from "../redux";

interface IProps {
	_id: string;
	bookCount: number;
	inBook: boolean | undefined;
}

const BookToggle: FC<IProps> = ({_id, bookCount, inBook}) => {
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

	function renderAction() {
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
	}

	return (
		renderAction() ?? <Box>Book toggle</Box>
	);
};

export {BookToggle};
