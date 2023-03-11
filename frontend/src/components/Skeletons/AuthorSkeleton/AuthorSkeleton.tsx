import {FC} from "react";
import {Card, CardContent, CardHeader, Grid, Skeleton} from "@mui/material";

const AuthorSkeleton: FC = () => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card>
				<CardHeader
					avatar={<Skeleton variant="circular" width={40} height={40} />}
					title={<Skeleton variant="text" />}
				/>
				<CardContent>
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="text" />
				</CardContent>
			</Card>
		</Grid>
	);
};

export {AuthorSkeleton};
