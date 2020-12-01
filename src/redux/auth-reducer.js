import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'set_user_data'

let initalState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setUserDataAc = (userId, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
)
export const getUserData = () =>
    async (dispatch) => {
        let response = await authApi.me()
        let {id, login, email} = response.data.data
        if (response.data.resultCode === 0) {
            dispatch(setUserDataAc(id, email, login, true))
        }
    }

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    } else {
        let error = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
        let action = stopSubmit("login", {_error: error})
        dispatch(action);
    }

}

export const logout = () => async (dispatch) => {
    let response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setUserDataAc(null, null, null, null))
            }
}
export default authReducer;