import {FC, useState} from "react";
import {Alert, Avatar, Badge, Box, Typography} from "@mui/material";

import {IAuthor} from "../../interfaces";
import {baseURL} from "../../configs";
import {LikeToggle} from "../LikeToggle/LikeToggle";
import {SubscribeToggle} from "../SubscribeToggle/SubscribeToggle";
import {ReportButton} from "../ReportButton/ReportButton";
import {useAppSelector} from "../../hooks";
import {BlockButton} from "../BlockButton/BlockButton";
import {getPrettyDate} from "../../helpers";

interface IProps {
	author: IAuthor;
}

const AuthorInfo: FC<IProps> = ({author}) => {
	const {
		_id,
		userName,
		avatar,
		totalLikes,
		isLiked,
		isSubscribed,
		recipes,
		block,
		totalSubscriptions,
		createdAt,
		totalSubscribers,
		role
	} = author;

	const [liked, setLiked] = useState<boolean | undefined>(isLiked);
	const [totalLikesState, setTotalLikesState] = useState<number>(totalLikes);

	const [isReport, setIsReport] = useState<boolean>(false);
	const [isBlock, setIsBlock] = useState<boolean>(false);

	const {loginAuthor} = useAppSelector(state => state.authReducer);

	return (
		<Box sx={{width: "fit-content", margin: "0 auto", padding: 2}}>
			{isReport && <Alert severity="success">
				Report sent
			</Alert>}
			{isBlock && <Alert severity="success">
				Author has been blocked
			</Alert>}
			<Box sx={{display: "flex", columnGap: 2, alignItems: "center", padding: 1}}>
				<Badge badgeContent={role} invisible={role === "user"} color="primary" showZero>
					<Avatar sx={{width: 112, height: 112}} srcSet={avatar ? baseURL + avatar : "/broken-image.jpg"} />
				</Badge>
				<Box>
					<Typography variant="h4">{userName}</Typography>
					<Typography variant="subtitle1">{getPrettyDate(createdAt)}</Typography>
				</Box>
				<Box sx={{display: "flex", minWidth: 130, alignItems: "center", flexDirection: "column", rowGap: 1}}>
					<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
						<LikeToggle
							_id={_id}
							totalLikes={totalLikesState}
							setTotalLikes={setTotalLikesState}
							isLiked={liked}
							setLiked={setLiked} />
						<ReportButton authorId={_id} isReport={setIsReport} />
						{
							loginAuthor?.role === "admin" &&
							<BlockButton authorId={_id} isBlock={setIsBlock} />
						}
					</Box>
					<SubscribeToggle _id={_id} isSubscribed={isSubscribed} />
				</Box>
			</Box>
			{
				block &&
				<Box>
					<Alert severity="warning">This author blocked until {getPrettyDate(block)}</Alert>
				</Box>
			}
			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: 1,
				borderBottom: "1px solid black"
			}}>
				<Typography variant="body1">
					Total subscribers
				</Typography>
				<Typography variant="body1">
					{totalSubscribers}
				</Typography>
			</Box>
			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: 1,
				borderBottom: "1px solid black"
			}}>
				<Typography variant="body1">
					Total subscriptions
				</Typography>
				<Typography variant="body1">
					{totalSubscriptions}
				</Typography>
			</Box>
			<Box sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: 3}}>
				<Typography variant="h3">Recipes</Typography>
				<Typography variant="subtitle1">({recipes})</Typography>
			</Box>
		</Box>
	);
};

export {AuthorInfo};
