import {authApi, securityApi, securityApy} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'set_user_data'
const GET_CAPTCHA_URL_SUCCESS = 'get_captcha_url_success';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.captchaUrl}
        default:
            return state
    }
}

export const setUserDataAc = (userId, email, login, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
)

export const getCaptchaSuccessAc = (url) => {
    return {
        type:GET_CAPTCHA_URL_SUCCESS,
        captchaUrl: url
    }
}

export const getUserData = () =>
    async (dispatch) => {
        let response = await authApi.me()
        let {id, login, email} = response.data.data
        if (response.data.resultCode === 0) {
            dispatch(setUserDataAc(id, email, login, true))
        }
    }

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authApi.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    }else if(response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
    } else  {
        let error = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
        let action = stopSubmit("login", {_error: error})
        dispatch(action);
    }
}

export const getCaptchaUrl= () => async (dispatch) => {
    let response = await securityApi.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaSuccessAc(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setUserDataAc(null, null, null, null))
            }
}
export default authReducer;