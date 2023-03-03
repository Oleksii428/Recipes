import {FC} from "react";
import Carousel from "react-material-ui-carousel";
import {Box, Paper} from "@mui/material";
import {ArrowForwardIosRounded, ArrowBackIosRounded} from "@mui/icons-material";

import {baseURL} from "../../../configs";

interface IProps {
	gallery: [
		{
			_id: string,
			path: string
		}
	],
}

const CarouselSlider: FC<IProps> = ({gallery}) => {
	return (
		<Carousel
			NextIcon={<ArrowForwardIosRounded />}
			PrevIcon={<ArrowBackIosRounded />}
			navButtonsProps={{
				style: {
					backgroundColor: "#1976d2"
				}
			}}
			activeIndicatorIconButtonProps={{
				style: {
					color: "#1976d2"
				}
			}}
			height={300}
			animation="slide"
			stopAutoPlayOnHover={true}
			navButtonsAlwaysVisible={true}
			fullHeightHover={false}
			indicators={true}
			autoPlay={false}
		>
			{gallery.map(({_id, path}) => {
				const fileExt = path.split(".").pop();
				const isVideo = fileExt === "mp4" || fileExt === "webm";

				return (
					<Paper
						key={_id}
						elevation={0}
						sx={{
							height: 300,
							position: "relative"
						}}
					>
						{isVideo ? (
							<Box
								component="video"
								src={`${baseURL}${path}`}
								controls={true}
								loop={true}
								muted={true}
								sx={{
									width: "100%",
									height: "100%",
									position: "absolute",
									objectFit: "contain",
									top: 0,
									left: 0
								}}
							/>
						) : (
							<Box
								component="img"
								src={`${baseURL}${path}`}
								sx={{
									width: "100%",
									height: "100%",
									position: "absolute",
									objectFit: "contain",
									top: 0,
									left: 0
								}}
							/>
						)}
					</Paper>
				);
			})}
		</Carousel>
	);
};

export {CarouselSlider};
