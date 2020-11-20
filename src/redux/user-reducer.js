import {usersAPI} from "../api/api";

const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_USERS = 'set_users';
const SET_CURRENT_PAGE = 'set_current_page';
const SET_TOTAL_COUNT = 'set_total_count';
const TOGGLE_IS_FETCHING = 'toggle_is_fetching';
const FOLLOWING_IN_PROGRESS = 'following_in_progress';

let initalState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initalState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.page}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state, followingInProgress: action.followingInProgress ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }

}

export let followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId: userId
    }
}
export let unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId: userId
    }
}
export let setCurPage = (page) => {
    return {type: SET_CURRENT_PAGE, page: page}
}
export let setUsersAc = (users) => {
    return {type: SET_USERS, users: users}
}
export let setTotalCount = (count) => {
    return {type: SET_TOTAL_COUNT, totalCount: count}
}
export let setIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching: isFetching}
}
export let setIsFollowing = (followingInProgress, userId) => {
    return {
        type: FOLLOWING_IN_PROGRESS,
        userId: userId,
        followingInProgress: followingInProgress
    }
}
export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsersAc(data.items))
            dispatch(setTotalCount(data.totalCount))
            dispatch(setIsFetching(false));
        })
    }
}
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setIsFollowing(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(setIsFollowing(false, userId));
            }).catch((error) => {
            dispatch(setIsFollowing(false, userId));
        })
    }

}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(setIsFollowing(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId))
                }
               dispatch(setIsFollowing(false, userId));
            }).catch((error) => {
            dispatch(setIsFollowing(false, userId));
        })
    }
}

export default usersReducer;