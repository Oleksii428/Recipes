import {FC} from "react";
import {Box, Typography} from "@mui/material";

import {Stage} from "../Stage/Stage";

interface IStage {
	_id: string;
	number: number;
	photo: string | null;
	description: string;
}

interface IStages {
	stages: IStage[],
}

const Stages: FC<IStages> = ({stages}) => {
	return (
		<Box>
			<Typography variant="h4" fontWeight={500} mb={2}>Stages</Typography>
			<Box sx={{display: "flex", flexDirection: "column", rowGap: 3}}>
				{stages.map(stage =>
					<Stage key={stage._id} stage={stage} />
				)}
			</Box>
		</Box>
	);
};

export {Stages};
