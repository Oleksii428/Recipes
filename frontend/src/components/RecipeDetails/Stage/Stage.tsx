import {FC} from "react";
import {Box, Typography} from "@mui/material";

interface IStage {
	stage: {
		_id: string,
		number: number,
		photo: string | null,
		description: string
	},
}

const Stage: FC<IStage> = ({stage}) => {
	const {number, photo, description} = stage;

	return (
		<Box sx={{display: "flex", flexDirection: "column", rowGap: 0.5}}>
			<Box display="flex" columnGap={1}>
				<Typography variant="h6" fontWeight={500}>Step</Typography>
				<Typography variant="h6" fontWeight={500}>{number}</Typography>
			</Box>
			<Typography variant="body1" maxWidth={300}>{description}</Typography>
			{photo &&
				<Box sx={{
					position: "relative",
					height: 300
				}}>
					<Box
						component="img"
						src={photo}
						sx={{
							position: "absolute",
							width: "100%",
							height: "100%",
							top: 0,
							left: 0,
							objectFit: "cover"
						}}
					/>
				</Box>
			}
		</Box>
	);
};

export {Stage};
