import React from "react";
import { AUTHTOKEN, USERID } from "../constants";

export const LoginContext = React.createContext();

let initialState = {
    token: localStorage.getItem(AUTHTOKEN),
    id: localStorage.getItem(USERID)
};

function reducer(state, action) {
    let { token, id } = state;
    switch (action.type) {
        case "SAVE_TOKEN":
            token = action.payload.token;
            id = action.payload.id;
            localStorage.setItem(AUTHTOKEN, token);
            localStorage.setItem(USERID, id);
            return { token, id };
        case "LOGOUT":
                token = null;
                id = null;
                localStorage.removeItem(AUTHTOKEN);
                localStorage.removeItem(USERID);
            return { token, id };
        default:
            return state;
    }
}

export const LoginProvider = props => {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };
    return (
        <LoginContext.Provider value={value}>
            {props.children}
        </LoginContext.Provider>
    );
};

export const LoginConsumer = props => {
    return <LoginContext.Consumer>{props.children}</LoginContext.Consumer>;
};
