import {Dispatch} from "react";
import {IAuthAction, isLogin} from "./action";
import {CallHistoryMethodAction} from "connected-react-router";
import {RegisterInfo} from "./state";

const {REACT_APP_API_SERVER} = process.env;

export function login(username: string, password: string) {
    console.log("username and password received from thunk: ", username, password);


    return async (dispatch: Dispatch<IAuthAction | CallHistoryMethodAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/login2`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const realRes = await res.json();
        
        const token = realRes.token;

        token !== undefined ? dispatch(isLogin()) : console.log("login failed");
        localStorage.setItem("token", token);
        // .push('/isauthenticated');
    }
}

export function register(registerInfo: RegisterInfo) {
    console.log("registerInfo", registerInfo);
    return async (dispatch: Dispatch<IAuthAction>) => {
        try {
            const res = await fetch(`${REACT_APP_API_SERVER}/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                // body: JSON.stringify({
                //     username: registerInfo.username,
                //     password: registerInfo.password,
                //     chiName: registerInfo.chiName,
                //     engName: registerInfo.engName,
                //     telephone: registerInfo.telephone,
                //     email: registerInfo.email,
                //     sex: 'M',
                // }),
                body: JSON.stringify(registerInfo)
            });
            const realRes = await res.json();
            console.log(realRes);
        } catch (e) {
            console.log("Sth wrong with the register thunk");
            console.log(e);
        }
    }
}

