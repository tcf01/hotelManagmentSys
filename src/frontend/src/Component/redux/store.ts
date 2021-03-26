import {combineReducers, applyMiddleware, createStore} from "redux";
import {composeEnhancers, history} from "../../history";
import {connectRouter, routerMiddleware, CallHistoryMethodAction, RouterState} from "connected-react-router";
import {IHotelState} from "./hotel/state";
import {IHotelAction} from "./hotel/action";
import {hotelReducer} from "./hotel/reducer";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {IAuthState} from "./auth/state";
import {authReducer} from "./auth/reducer";
import {IAuthAction} from "./auth/action";


export interface IRootState {
    hotel: IHotelState,
    auth: IAuthState,
    router: RouterState;
}

export type IRootAction = IHotelAction | IAuthAction | CallHistoryMethodAction

export type ThunkDispatchCustom = ThunkDispatch<IRootState, null, IRootAction>;

const rootReducer = combineReducers<IRootState>({
    hotel: hotelReducer,
    auth: authReducer,
    router: connectRouter(history)
});

export default createStore<IRootState, IRootAction, {}, {}>(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    )
)