import {FC, useState} from "react";
import {Badge, Box, IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../hooks";
import {likeActions} from "../redux";

interface IProps {
	_id: string;
	totalLikes: number;
	isLiked: boolean | undefined;
}

const LikeToggle: FC<IProps> = ({_id, totalLikes, isLiked}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.likeReducer);

	const [clickLike, setClickLike] = useState<boolean>(false);
	const [likeCounter, setLikeCounter] = useState<number>(totalLikes);

	const handleLikeInc = async (n: number) => {
		await dispatch(likeActions.likeToggle(_id));
		setClickLike(false);
		setLikeCounter(prevState => prevState + n);
	};

	const handleLikeDec = async (n: number) => {
		await dispatch(likeActions.likeToggle(_id));
		setClickLike(true);
		setLikeCounter(prevState => prevState - n);
	};

	function renderAction() {
		if (!loginAuthor) {
			return <IconButton onClick={() => navigate("/login")}>
				<Badge badgeContent={totalLikes} color="secondary" showZero>
					<FavoriteBorder fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		} else if (loginAuthor && isLiked) {
			if (!clickLike) {
				return <IconButton disabled={loading || loginAuthor._id === _id} onClick={() => handleLikeDec(1)}>
					<Badge badgeContent={likeCounter} color="secondary" showZero>
						<Favorite fontSize="medium" color="primary" />
					</Badge>
				</IconButton>;
			} else {
				return <IconButton disabled={loading || loginAuthor._id === _id} onClick={() => handleLikeInc(1)}>
					<Badge badgeContent={likeCounter} color="secondary" showZero>
						<FavoriteBorder fontSize="medium" color="primary" />
					</Badge>
				</IconButton>;
			}
		} else if (loginAuthor && !isLiked) {
			if (clickLike) {
				return <IconButton disabled={loading || loginAuthor._id === _id} onClick={() => handleLikeInc(-1)}>
					<Badge badgeContent={likeCounter} color="secondary" showZero>
						<Favorite fontSize="medium" color="primary" />
					</Badge>
				</IconButton>;
			} else {
				return <IconButton disabled={loading || loginAuthor._id === _id} onClick={() => handleLikeDec(-1)}>
					<Badge badgeContent={likeCounter} color="secondary" showZero>
						<FavoriteBorder fontSize="medium" color="primary" />
					</Badge>
				</IconButton>;
			}
		}
	}

	return (
		renderAction() ?? <Box>Like</Box>
	);
};

export {LikeToggle};
