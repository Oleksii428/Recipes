import {FC} from "react";
import {Badge, Box, IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {likeActions} from "../../redux";

interface IProps {
	_id: string;
	totalLikes: number;
	isLiked: boolean | undefined;
	setLiked: Function;
	setTotalLikes: Function;
}

const LikeToggle: FC<IProps> = ({_id, totalLikes, isLiked, setLiked, setTotalLikes}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.likeReducer);

	const handleLikeInc = async () => {
		await dispatch(likeActions.likeToggle(_id));
		setTotalLikes(totalLikes + 1);
		setLiked(true);
	};

	const handleLikeDec = async () => {
		await dispatch(likeActions.likeToggle(_id));
		setTotalLikes(totalLikes - 1);
		setLiked(false);
	};

	function renderAction() {
		if (!loginAuthor) {
			return <IconButton onClick={() => navigate("/login")}>
				<Badge badgeContent={totalLikes} color="secondary" showZero>
					<FavoriteBorder fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		} else if (isLiked) {
			return <IconButton disabled={loading || loginAuthor._id === _id} onClick={handleLikeDec}>
				<Badge badgeContent={totalLikes} color="secondary" showZero>
					<Favorite fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		} else {
			return <IconButton disabled={loading || loginAuthor._id === _id} onClick={handleLikeInc}>
				<Badge badgeContent={totalLikes} color="secondary" showZero>
					<FavoriteBorder fontSize="medium" color="primary" />
				</Badge>
			</IconButton>;
		}
	}

	return (
		renderAction() ?? <Box>Like</Box>
	);
};

export {LikeToggle};
