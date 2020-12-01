import React from "react";
import {getUserData} from "./auth-reducer";

const INITIALISED_SUCCESS = "INITIALISED_SUCCESS"

let initialState = {
    initialized: false
}

export const appReducer = (state=initialState, action) => {
    switch(action.type){
        case INITIALISED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

export const initializedSuccess = () => {
    return {type: INITIALISED_SUCCESS}
}

export const initializeApp = () => (dispatch)=> {
    let promise = dispatch(getUserData());
    promise.then(() => {
        dispatch(initializedSuccess());
    })
}