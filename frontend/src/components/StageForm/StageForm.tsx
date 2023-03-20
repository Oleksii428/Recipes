import {FC, useEffect, useState} from "react";
import {Alert, Box, Button, IconButton, TextField, Typography} from "@mui/material";
import {ICreateStage} from "../../interfaces";
import {imageValidator} from "../../validators";
import {Delete} from "@mui/icons-material";

interface IProps {
	stages: ICreateStage[],
	setStages: Function
}

const StageForm: FC<IProps> = ({stages, setStages}) => {
	const [currentImage, setCurrentImage] = useState<File | undefined>(undefined);
	const [currentDescription, setCurrentDescription] = useState<string>("");
	const [photoError, setPhotoError] = useState<string | undefined>(undefined);

	const addStage = (): void => {
		if (!photoError) {
			setStages([...stages, {number: stages.length + 1, image: currentImage, description: currentDescription}]);
			setCurrentImage(undefined);
			setCurrentDescription("");
		}
	};

	const removeStage = (index: number): void => {
		const newStages = stages.filter((stage, i) => i !== index);
		setStages(newStages.reduce((acc: ICreateStage[], currentValue, currentIndex) => {
			acc.push({...currentValue, number: currentIndex + 1});
			return acc;
		}, []));
	};

	const removeCurrPhoto = (): void => {
		setCurrentImage(undefined);
		setPhotoError(undefined);
	};

	useEffect(() => {
		if (currentImage) {
			setPhotoError(imageValidator(currentImage));
		}
	}, [currentImage]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				rowGap: 1
			}}
		>
			<Typography variant="h5" fontWeight={500} sx={{mb: 1}}>Add Stages</Typography>
			{
				stages.map((stage, index) =>
					<Box key={index} sx={{p: 1, border: "1px solid black", boxSizing: "border-box"}}>
						<Box
							sx={{
								display: "flex",
								rowGap: 1,
								alignItems: "center",
								justifyContent: "space-between"
							}}
						>
							<Typography variant="h6">{stage.number}</Typography>
							<IconButton onClick={() => removeStage(index)}>
								<Delete fontSize="medium" color="primary" />
							</IconButton>
						</Box>
						<Box sx={{
							position: "relative",
							height: 100
						}}>
							{
								stage.image &&
								<Box
									component="img"
									src={URL.createObjectURL(stage.image)}
									sx={{
										position: "absolute",
										width: "100%",
										height: "100%",
										top: 0,
										left: 0,
										objectFit: "cover"
									}}
								/>
							}
						</Box>
						<Box>
							<Typography sx={{maxWidth: "285px"}} variant="body1">
								{stage.description}
							</Typography>
						</Box>
					</Box>
				)
			}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					rowGap: 1
				}}
			>
				{!currentImage && <label htmlFor="stage-photo">
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
					<input
						color="primary"
						accept="image/jpeg, image/png, image/webp"
						type="file"
						onChange={event => {
							setCurrentImage(event.target.files![0]);
						}}
						id="stage-photo"
						style={{display: "none"}}
					/>
				</label>}
				{currentImage &&
					<Box>
						<Box sx={{
							position: "relative",
							height: 100
						}}>
							<Box
								component="img"
								src={URL.createObjectURL(currentImage)}
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
						{photoError && <Alert severity="error">{photoError}</Alert>}
						<Button variant="outlined" onClick={removeCurrPhoto}>Remove image</Button>
					</Box>
				}
				<TextField
					type="text"
					label="Description"
					required={true}
					onChange={(e) => setCurrentDescription(e.target.value)}
					value={currentDescription}
				/>
			</Box>
			<Button
				onClick={addStage}
				variant="outlined"
				disabled={(currentDescription.length < 5 || currentDescription.length > 1000) || !!photoError}
			>
				Add stage
			</Button>
		</Box>
	);
};

export {StageForm};
