import React from "react";
import { AUTHTOKEN } from "../constants";

export const LoginContext = React.createContext();

let initialState = {
    token: localStorage.getItem(AUTHTOKEN)
};

function reducer(state, action) {
    let { token } = state;
    switch (action.type) {
        case "SAVE_TOKEN":
            token = action.payload;
            localStorage.setItem(AUTHTOKEN, token);
            return { token };
        case "LOGOUT":
                token = null;
                localStorage.removeItem(AUTHTOKEN);
            return { token };
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
