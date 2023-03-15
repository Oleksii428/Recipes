import {ChangeEvent, FC} from "react";
import {Alert, Box, Button, Typography} from "@mui/material";

import {videoValidator} from "../../../validators";

interface IProps {
	video: File | undefined,
	setVideo: Function,
	error: string | undefined,
	setError: Function
}

const AddVideo: FC<IProps> = ({video, setError, error, setVideo}) => {
	const handleAddVideo = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files?.length) {
			const video: File = e.target.files[0];
			setVideo(video);
			setError(videoValidator(video));
		}
	};

	const handleRemoveVideo = (): void => {
		setVideo(undefined);
		setError(undefined);
	};

	return (
		<Box>
			<input
				accept="video/mp4, video/webm"
				type="file"
				onChange={handleAddVideo}
				id="add-video-input"
				style={{display: "none"}}
			/>
			{
				video &&
				<Box sx={{
					position: "relative",
					height: 150
				}}>
					<Box
						component="video"
						src={URL.createObjectURL(video)}
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
			{
				!video &&
				<label htmlFor="add-video-input">
					<Box
						sx={{
							width: "100%",
							height: "55",
							boxSizing: "border-box",
							border: "2px dotted black",
							cursor: "pointer",
							padding: 2
						}}
					>
						<Typography variant="body1">
							Add Video
						</Typography>
					</Box>
				</label>
			}
			{
				video && error &&
				<Alert severity="error">
					{error}
				</Alert>
			}
			{
				video &&
				<Button variant="outlined" onClick={handleRemoveVideo}>Remove</Button>
			}
		</Box>
	);
};

export {AddVideo};
