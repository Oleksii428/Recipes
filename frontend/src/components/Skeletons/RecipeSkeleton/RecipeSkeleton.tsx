import {FC} from "react";
import {Card, CardContent, CardHeader, CardMedia, Grid, Skeleton} from "@mui/material";

const RecipeSkeleton: FC = () => {
	return (
		<Grid item xl={3} lg={4} md={5}>
			<Card>
				<CardHeader
					avatar={<Skeleton variant="circular" width={40} height={40} />}
					title={<Skeleton variant="text" />}
					subheader={<Skeleton variant="text" />}
				/>
				<CardContent>
					<Skeleton variant="text" sx={{fontSize: "2rem"}} />
					<CardMedia>
						<Skeleton variant="rectangular" height={150} />
					</CardMedia>
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="text" width="50%" sx={{fontSize: "2rem"}} />
					<Skeleton variant="rectangular" width="30%" height={30} />
				</CardContent>
			</Card>
		</Grid>
	);
};

export {RecipeSkeleton};
