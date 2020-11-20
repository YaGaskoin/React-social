import {authApi} from "../api/api";

const SET_USER_DATA = 'set_user_data'

let initalState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initalState, action) => {
    switch(action.type){
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}

export const setUserDataAc = (userId, email, login) => (
    {type: SET_USER_DATA, data:{userId, email, login}}
)
export const getUserData = () => {
    return (dispatch) => {
         authApi.me()
            .then(response => {
                let {id, login,email} = response.data.data
                if (response.data.resultCode === 0) {
                    dispatch(setUserDataAc(id, email, login))
                }
            })
    }
}
export default authReducer;