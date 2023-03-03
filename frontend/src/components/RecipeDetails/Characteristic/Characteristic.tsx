import {FC} from "react";
import {Grid, Paper, Typography} from "@mui/material";

interface IProps {
	kitchen: string;
	category: string;
	servings: number;
	time: number;
}

const Characteristic: FC<IProps> = ({kitchen, category, servings, time}) => {
	return (
		<Paper
			sx={{
				backgroundColor: "lightgrey",
				marginTop: 4
			}}
		>
			<Grid
				container
				sx={{
					rowGap: 2,
					justifyContent: "space-between",
					columnGap: 1,
					padding: 1,
					alignItems: "center"
				}}
			>
				<Grid xs={5}>
					<Typography component="span" variant="body1" fontWeight={700} mr={1}>
						Kitchen:
					</Typography>
					<Typography component="span">
						{kitchen}
					</Typography>
				</Grid>
				<Grid xs={5}>
					<Typography component="span" variant="body1" fontWeight={700} mr={1}>
						Category:
					</Typography>
					<Typography component="span">
						{category}
					</Typography>
				</Grid>
				<Grid xs={5}>
					<Typography component="span" variant="body1" fontWeight={700} mr={1}>
						Servings:
					</Typography>
					<Typography component="span">
						{servings}
					</Typography>
				</Grid>
				<Grid xs={5}>
					<Typography component="span" variant="body1" fontWeight={700} mr={1}>
						Time:
					</Typography>
					<Typography component="span">
						{time}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export {Characteristic};
