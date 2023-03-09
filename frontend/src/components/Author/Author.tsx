import {FC, useState} from "react";
import {Avatar, Badge, Box, Card, CardContent, CardHeader, Grid, IconButton, Link, Typography} from "@mui/material";
import {FavoriteBorder, Favorite} from "@mui/icons-material";

import {IAuthor} from "../../interfaces";
import {baseURL} from "../../configs";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {likeActions} from "../../redux";

interface IProps {
	author: IAuthor;
}

const Author: FC<IProps> = ({author}) => {
	const {
		_id,
		avatar,
		userName,
		recipes,
		totalBook,
		totalSubscribers,
		totalSubscriptions,
		totalLikes,
		isLiked
	} = author;

	const tableData = [
		{
			label: "Total recipes",
			value: recipes
		},
		{
			label: "Total subscribers",
			value: totalSubscribers
		},
		{
			label: "Total subscriptions",
			value: totalSubscriptions
		},
		{
			label: "Recipes in book",
			value: totalBook
		}
	];

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

	const renderAction = () => {

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
	};

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<CardHeader
					avatar={<Avatar sx={{width: 56, height: 56}} srcSet={avatar ? baseURL + avatar : "/broken-image.jpg"} />}
					title={
						<Link
							href={`authors/${_id}`}
							variant="body1"
							sx={{cursor: "pointer"}}
						>
							{userName}
						</Link>
					}
					action={renderAction()}
				/>
				<CardContent>
					<Box sx={{display: "flex", flexDirection: "column", rowGap: 1}}>
						{tableData.map((item, index) => (
							<Box key={index}
								  sx={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc"}}>
								<Typography variant="body1">{item.label}</Typography>
								<Typography variant="body1">{item.value}</Typography>
							</Box>
						))}
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Author};
