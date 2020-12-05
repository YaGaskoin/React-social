import {profileApi, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'add_post';
const CHANGE_NEW_POST_TEXT = 'change_new_post_text';
const SET_USER_PROFILE = 'set_user_profile';
const SET_STATUS = 'SET_STATUS';
const PHOTO_SUCCESS = 'photo_success';
const EDIT_USER_INFO = 'edit_user_info';
const SET_EDIT_MODE = 'set_edit_mode';

let initalState = {
    posts: [
        {id: '1', message: 'Hi, how are you?', likesCount: '10'},
        {id: '2', message: 'Are Ya winning son?', likesCount: '12'},
    ],
    newPost: '',
    profile: null,
    status: "",
    editMode: false,
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
        case PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        case SET_EDIT_MODE:{
            return {...state, editMode: action.editMode}
        }
        case EDIT_USER_INFO: {
            return {
                ...state, profile:{...state.profile, ...action.obj}
            }
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

export const setEditModeAc = (editMode) => {
    return {
        type: SET_EDIT_MODE,
        editMode: editMode,
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
export const savePhotoSuccess = (photos) => {
    return {
        type: PHOTO_SUCCESS,
        photos: photos
    }
}
export const editUserInfoAc = (infoObj) => {
    return {
        type: EDIT_USER_INFO,
        obj: infoObj
    }
}

export const editUserInfo = (infoObj) => {
    return async (dispatch) => {
        let response = await profileApi.editProfile(infoObj)
        if (response.data.resultCode === 0) {
            dispatch(editUserInfoAc(infoObj))
            dispatch(setEditModeAc(true));
        }else{
            dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
        }
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

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileApi.savePhoto(file)
        dispatch(savePhotoSuccess(response.data.data.photos));

    }
}

export default profileReducer;