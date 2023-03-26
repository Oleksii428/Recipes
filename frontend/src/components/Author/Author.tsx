import {FC} from "react";
import {Avatar, Box, Card, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";

import {IAuthor} from "../../interfaces";
import {LikeToggle} from "../LikeToggle/LikeToggle";
import {useNavigate} from "react-router-dom";

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
		totalSubscriptions
	} = author;

	const navigate = useNavigate();

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

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<CardHeader
					avatar={<Avatar sx={{width: 56, height: 56}} srcSet={avatar ? avatar : "/broken-image.jpg"} />}
					title={
						<Link
							onClick={() => navigate(`/authors/${_id}`)}
							variant="body1"
							sx={{cursor: "pointer"}}
						>
							{userName}
						</Link>
					}
					action={<LikeToggle _id={_id} />}
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
