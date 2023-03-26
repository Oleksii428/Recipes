import {FC, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Badge, Box, IconButton} from "@mui/material";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {bookActions, recipeActions} from "../../redux";

interface IProps {
	_id: string;
}

const BookToggle: FC<IProps> = ({_id}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.bookReducer);
	const {list: {recipes}, recipe: recipeById} = useAppSelector(state => state.recipeReducer);

	const [inBook, setInBook] = useState<boolean>(false);
	const [bookCount, setBookCount] = useState<number>(0);

	const recipe = useMemo(() => {
		if (!!recipes.length) {
			const index = recipes.findIndex(recipe => recipe._id === _id);

			if (index >= 0) return recipes[index];
		} else {
			return recipeById;
		}
	}, [_id, recipeById, recipes]);

	useEffect(() => {
		if (recipe) {
			setInBook(!!recipe?.inBook);
			setBookCount(recipe?.bookCount ?? 0);
		}
	}, [recipe]);

	const handleBookInc = async () => {
		await dispatch(bookActions.bookToggle(_id));
		if (!!recipes.length) {
			dispatch(recipeActions.bookToggle(_id));
			dispatch(recipeActions.incBookCount(_id));
		} else {
			dispatch(recipeActions.bookToggleId());
			dispatch(recipeActions.incBookCountId());
		}
	};

	const handleBookDec = async () => {
		await dispatch(bookActions.bookToggle(_id));
		if (!!recipes.length) {
			dispatch(recipeActions.decBookCount(_id));
			dispatch(recipeActions.bookToggle(_id));
		} else {
			dispatch(recipeActions.bookToggleId());
			dispatch(recipeActions.decBookCountId());
		}
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
