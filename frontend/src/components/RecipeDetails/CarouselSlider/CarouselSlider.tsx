import {FC} from "react";
import Carousel from "react-material-ui-carousel";
import {Box, Paper} from "@mui/material";

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
			height={300}
			animation="slide"
			stopAutoPlayOnHover={true}
			navButtonsAlwaysVisible={true}
			indicators={true}
		>
			{
				gallery.map((item, i) =>
					<Paper
						key={i}
						elevation={0}
						sx={{
							height: 300,
							position: "relative"
						}}>
						<Box
							component="img"
							src={baseURL + item.path}
							sx={{
								width: "100%",
								height: "100%",
								position: "absolute",
								objectFit: "contain",
								top: 0,
								left: 0
							}}
						/>
					</Paper>
				)
			}
		</Carousel>
	);
};

export {CarouselSlider};
