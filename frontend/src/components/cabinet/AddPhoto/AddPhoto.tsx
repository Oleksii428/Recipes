import {ChangeEvent, FC} from "react";
import {Alert, Box, Button, Typography} from "@mui/material";
import {imageValidator} from "../../../validators";

interface IProps {
	photos: File[],
	setPhotos: Function,
	errors: string[],
	setErrors: Function
}

const AddPhoto: FC<IProps> = ({photos, setPhotos, errors, setErrors}) => {
	const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files?.length) {
			const photo = e.target.files[0];
			setPhotos([...photos, photo]);
			setErrors([...errors, imageValidator(photo)]);
		}
	};

	const handleRemovePhoto = (index: number): void => {
		setPhotos(photos.filter((photo, i) => i !== index));
		setErrors(errors.filter((error, i) => i !== index));
	};

	return (
		<Box>
			<input
				color="primary"
				accept="image/jpeg, image/png, image/webp"
				type="file"
				onChange={handleAddPhoto}
				id="add-photo-input"
				style={{display: "none"}}
			/>
			{
				photos.map((photo, index) =>
					<Box key={index}>
						<Box
							sx={{
								position: "relative",
								height: 150
							}}>
							<Box
								component="img"
								src={URL.createObjectURL(photo)}
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
						{
							!!errors[index] &&
							<Alert severity="error">
								{errors[index]}
							</Alert>
						}
						<Button onClick={() => {
							handleRemovePhoto(index);
						}} variant="outlined">Remove</Button>
					</Box>
				)
			}
			<label htmlFor="add-photo-input">
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
						Add Image
					</Typography>
				</Box>
			</label>
		</Box>
	);
};

export {AddPhoto};
