import {profileApi, usersAPI} from "../api/api";

const ADD_POST = 'add_post';
const CHANGE_NEW_POST_TEXT = 'change_new_post_text';
const SET_USER_PROFILE = 'set_user_profile';
const SET_STATUS = 'SET_STATUS'

let initalState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: '10'},
        {id: '2', message: 'Are Ya winning son?', likesCount: '12'},
    ],
    newPost: '',
    profile: null,
    status: "",
}

const profileReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let stateCopy = {
                ...state,
                posts: [...state.posts]
            }
            let newPost = {
                id: '3',
                message: action.text,
                likesCount: '0',
            }
            stateCopy.posts.push(newPost)
            stateCopy.newPost = ''
            return stateCopy;
        }
        case CHANGE_NEW_POST_TEXT: {
            let stateCopy = {
                ...state,
                newPost: action.text
            }
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }

}

export let addPostActionCreator = (text) => {
    return {
        type: ADD_POST,
        text: text
    }
}
export let changePostActionCreator = (text) => {
    return {
        type: CHANGE_NEW_POST_TEXT,
        text: text,
    }
}
export let setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile,
    }
}
export let setStatusAc = (status) => {
    return {
        type: SET_STATUS,
        status: status
    }
}
export let deletePost = (postId) => {
    return {
        type: SET_STATUS,
        postId: postId
    }
}
export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId)
        dispatch(setStatusAc(response.data))
    }
}
export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileApi.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAc(status))
        }

    }
}
export const getProfile = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getProfile(userId)
        dispatch(setUserProfile(response.data));

    }
}

export default profileReducer;