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
    switch(action.type){
        case ADD_POST:
        {
            let stateCopy = {
                ...state,
                posts: [...state.posts]
            }
            let newPost = {
                id: '3',
                message: stateCopy.newPost,
                likesCount: '0',
            }
            stateCopy.posts.push(newPost)
            stateCopy.newPost = ''
            return stateCopy;
            }
        case CHANGE_NEW_POST_TEXT:
        {
            let stateCopy = {
                ...state,
                newPost: action.text
            }
            return stateCopy;
            }
        case SET_USER_PROFILE:{
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
          return state
    }

}

export let addPostActionCreator = () => {
    return {
            type: ADD_POST
        }
    }
    export let changePostActionCreator = ( text) => {
        return {
         type: CHANGE_NEW_POST_TEXT,
         text: text,
     }
    }
    export let setUserProfile = (profile) => {
    return{
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
    export const getStatus = (userId) => {
        return (dispatch) => {
            profileApi.getStatus(userId)
                .then(response => {
                    dispatch(setStatusAc(response.data))
                })
        }
    }
    export const updateStatus = (status) => {
    return (dispatch) => {
        profileApi.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0){
                    dispatch(setStatusAc(status))
                }

            })
    }
}
    export const getProfile = (userId) => {
    return (dispatch) => {
       profileApi.getProfile(userId).then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
    }

export default profileReducer;