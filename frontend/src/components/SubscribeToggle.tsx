import {FC, useEffect, useState} from "react";
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../hooks";
import {subscribeActions} from "../redux";

interface IProps {
	_id: string;
	isSubscribed: boolean | undefined;
}

const SubscribeToggle: FC<IProps> = ({_id, isSubscribed: state}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading, isSubscribed} = useAppSelector(state => state.subscribeReducer);

	const [wasClick, setWasClick] = useState<boolean>(false);
	const [isSubscribedCurrent, setIsSubscribedCurrent] = useState<boolean>();

	useEffect(() => {
		setIsSubscribedCurrent(state);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubscribeToggle = () => {
		dispatch(subscribeActions.subscribeToggle(_id));
		setWasClick(true);
	};

	useEffect(() => {
		console.log(isSubscribed);
		if (wasClick) {
			setIsSubscribedCurrent(isSubscribed);
		}

	}, [isSubscribed, wasClick]);

	function renderButton() {
		if (!loginAuthor) {
			return <Button onClick={() => navigate("/login")} variant="contained">subscribe</Button>;
		} else if (loading) {
			return <CircularProgress />;
		} else if (isSubscribedCurrent) {
			return <Button
				disabled={loginAuthor._id === _id}
				onClick={() => handleSubscribeToggle()}
				variant="contained">
				unsubscribe
			</Button>;
		} else if (!isSubscribedCurrent) {
			return <Button
				disabled={loginAuthor._id === _id}
				onClick={() => handleSubscribeToggle()}
				variant="contained">
				subscribe
			</Button>;
		}
	}

	return (
		renderButton() ?? <div>Button</div>
	);
};

export {SubscribeToggle};
