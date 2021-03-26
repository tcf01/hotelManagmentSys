import {IAuthAction} from "./action";
import {IAuthState} from "./state";

const initialState = {
    isLogin: false
};

export function authReducer(state: IAuthState = initialState, action: IAuthAction): IAuthState {
    switch (action.type) {
        case "@@auth/IS_LOGIN":
            return ({
                ...state,
                isLogin: true
            });
        case "@@auth/IS_LOGOUT":
            return ({
                ...state,
                isLogin: false
            });
        case "@@auth/GET_RESTORED_USER":
            return ({
                ...state,
                isLogin: true
            });
        default:
            return initialState
    }
}