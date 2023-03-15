import {FC, useEffect, useState} from "react";
import {Alert, Backdrop, Box, Button, CircularProgress, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {ICreateRecipe, ICreateStage} from "../../../interfaces";
import {createRecipeValidator} from "../../../validators";
import {IngredientsForm} from "../IngredientsForm/IngredientsForm";
import {CategoryForm} from "../CategoryForm/CategoryForm";
import {KitchenForm} from "../KitchenForm/KitchenForm";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {photoActions, recipeActions, videoActions} from "../../../redux";
import {AddPhoto} from "../AddPhoto/AddPhoto";
import {AddVideo} from "../AddVideo/AddVideo";
import {StageForm} from "../../StageForm/StageForm";

const CreateRecipeForm: FC = () => {
	const {handleSubmit, control, setValue, formState: {errors}} = useForm<ICreateRecipe>({
		resolver: joiResolver(createRecipeValidator),
		mode: "onChange"
	});

	const dispatch = useAppDispatch();
	const {error, loading: recipeLoading, createdRecipeId} = useAppSelector(state => state.recipeReducer);
	const {loading: photoLoading} = useAppSelector(state => state.photoReducer);
	const {loading: videoLoading} = useAppSelector(state => state.videoReducer);

	const onSubmit: SubmitHandler<ICreateRecipe> = (newRecipeData) => {
		dispatch(recipeActions.create(newRecipeData));
	};

	const [photos, setPhotos] = useState<File[]>([]);
	const [photoErrors, setPhotoErrors] = useState<string[]>([]);

	const [video, setVideo] = useState<File | undefined>(undefined);
	const [videoError, setVideoError] = useState<string | undefined>(undefined);

	const [stages, setStages] = useState<ICreateStage[]>([]);

	useEffect(() => {
		if (createdRecipeId) {
			if (photos.length) {
				photos.forEach(photo => {
					dispatch(photoActions.addPhotoToRecipe({recipeId: createdRecipeId, photo}));
				});
				setPhotos([]);
			}
			if (video) {
				dispatch(videoActions.addVideoToRecipe({recipeId: createdRecipeId, video}));
				setVideo(undefined);
			}
		}
	}, [createdRecipeId, dispatch, photos, video]);

	const isValid = (): boolean => !!photoErrors.filter(error => error !== undefined).length || !!videoError;

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={{
				display: "flex",
				flexDirection: "column",
				rowGap: 1,
				pb: 3
			}}>
			{
				error &&
				<Alert severity="error">
					Error
				</Alert>
			}
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={recipeLoading || photoLoading || videoLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{
				createdRecipeId &&
				<Alert
					sx={{width: "100%", boxSizing: "border-box"}}
					severity="success"
				>
					Recipe has been created
				</Alert>
			}
			<Controller
				name="title"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Title"
					/>
				)}
			/>
			<AddPhoto photos={photos} setPhotos={setPhotos} errors={photoErrors} setErrors={setPhotoErrors} />
			<AddVideo video={video} setVideo={setVideo} error={videoError} setError={setVideoError} />
			<Controller
				name="time"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						type="number"
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Total time (min)"
					/>
				)}
			/>
			<Controller
				name="servings"
				control={control}
				render={({field: {onChange, value}, fieldState: {error}}) => (
					<TextField
						type="number"
						error={!!error}
						helperText={error?.message}
						value={value || ""}
						onChange={onChange}
						margin="dense"
						label="Servings count"
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
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
			<CategoryForm errors={errors.category} setValue={setValue} />
			<KitchenForm setValue={setValue} errors={errors.kitchen} />
			<IngredientsForm setValue={setValue} name="ingredients" errors={errors.ingredients} />
			<StageForm stages={stages} setStages={setStages} />
			<Button
				disabled={isValid()}
				type="submit"
				variant="contained"
			>Create</Button>
		</Box>
	);
};

export {CreateRecipeForm};
