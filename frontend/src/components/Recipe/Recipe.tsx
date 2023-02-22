import {FC} from "react";
import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Paper,
	Rating,
	Typography
} from "@mui/material";

import {IRecipe} from "../../interfaces";
import {baseURL} from "../../configs";

interface Iprops {
	recipe: IRecipe;
}

const Recipe: FC<Iprops> = ({recipe}) => {
	const {
		_id,
		category,
		creator,
		createdAt,
		gallery,
		description,
		kitchen,
		rating,
		ingredients,
		reviewsCount,
		bookCount,
		time,
		stages,
		title,
		servings
	} = recipe;
	const {avatar, userName} = creator;

	return (
		<Grid item xs={3}>
			<Card>
				<CardHeader
					avatar={<Avatar src={avatar ? baseURL + avatar : "/broken-image.jpg"} />}
					title={userName}
					subheader={createdAt}
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
						Servings: {servings}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center"}}>
						<Rating name="read-only" value={rating} precision={0.1} readOnly />
						<Typography variant="body2" color="text.secondary">
							{reviewsCount}
						</Typography>
					</Typography>
					<Button variant="contained">
						Details
					</Button>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Recipe};
