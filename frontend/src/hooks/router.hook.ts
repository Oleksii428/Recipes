import {useLocation, Location} from "react-router-dom";

interface IState<G> extends Location {
	state: G;
}

const useAppLocation = <State>(): IState<State> => useLocation();

export {
	useAppLocation
};
