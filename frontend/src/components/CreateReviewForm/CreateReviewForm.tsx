import {ChangeEvent, FC, useState} from "react";
import {Alert, Backdrop, Box, Button, CircularProgress, Rating, TextField, Typography} from "@mui/material";
import {joiResolver} from "@hookform/resolvers/joi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {reviewActions} from "../../redux";
import {ICreateReview} from "../../interfaces";
import {createReviewValidator, imageValidator} from "../../validators";

interface IProps {
	_id: string;
}

const CreateReviewForm: FC<IProps> = ({_id}) => {
	const dispatch = useAppDispatch();
	const [image, setImage] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | undefined>("");

	const {loading, statusCode, errorMessage} = useAppSelector(state => state.reviewReducer);
	const {handleSubmit, control, reset} = useForm<ICreateReview>({
		resolver: joiResolver(createReviewValidator),
		mode: "all"
	});

	const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
		const photo = event.target.files![0];
		setImageError(imageValidator(photo));
		setImage((event.target as HTMLInputElement).files![0]);
	};

	const onSubmit: SubmitHandler<ICreateReview> = async ({text, rating}) => {
		if (!image) {
			dispatch(reviewActions.createReview({recipeId: _id, review: {rating, text}}));
		} else if (image && !imageError) {
			dispatch(reviewActions.createReview({recipeId: _id, review: {rating, text, photo: image}}));
		}
		reset();
	};

	return (
		<Box>
			<Typography variant="h4" fontWeight={500} sx={{mb: 1}}>Create Review</Typography>
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					display: "flex",
					flexDirection: "column",
					rowGap: 1
				}}
			>
				{statusCode === 201 &&
					<Alert severity="success">
						Review has been created
					</Alert>
				}
				{statusCode !== 201 && errorMessage &&
					<Alert severity="error">
						Error
					</Alert>
				}
				<Backdrop
					sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
					open={loading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Controller
					name={"text"}
					control={control}
					rules={{required: "User Name is required"}}
					render={({field: {onChange, value}, fieldState: {error}}) => (
						<TextField
							error={!!error}
							helperText={error?.message}
							value={value || ""}
							onChange={onChange}
							margin="dense"
							label="Description"
						/>
					)}
				/>
				<Controller
					control={control}
					name={"rating"}
					defaultValue={-1}
					render={({field: {onChange, value}}) => (
						<Rating
							name={"rating"}
							onChange={onChange}
							value={Number(value)}
							size="large"
						/>
					)}
				/>
				<Controller
					name={"photo"}
					control={control}
					render={({field: {onChange}}) => (
						<Box>
							<input
								color="primary"
								accept="image/jpeg, image/png, image/webp"
								type="file"
								onChange={event => {
									onChange();
									handleChangeImage(event);
								}}
								id="icon-button-file"
								style={{display: "none"}}
							/>
							{!image && <label htmlFor="icon-button-file">
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
										Upload Image
									</Typography>
								</Box>
							</label>}
							{image &&
								<Box sx={{
									position: "relative",
									height: 150
								}}>
									<Box
										component="img"
										src={URL.createObjectURL(image)}
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
								image && imageError &&
								<Alert severity="error">
									{imageError}
								</Alert>
							}
							{
								image &&
								<Button variant="outlined" onClick={() => setImage(null)}>Remove</Button>
							}
						</Box>
					)}
				/>
				<Button
					disabled={!!imageError}
					type="submit"
					variant="contained"
					sx={{mt: 3, mb: 2}}
				>
					Create Review
				</Button>
			</Box>
		</Box>
	);
};

export {CreateReviewForm};
