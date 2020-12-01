import React from 'react'
import {connect} from "react-redux";
import UsersApiComponent from "./UsersApiComponent";
import {
    follow,
    getUsersThunkCreator,
    setCurPage,
    setIsFetching,
    setIsFollowing,
    setTotalCount,
    setUsersAc,
    unfollow,
} from "../../redux/user-reducer";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth

    }
}

let mapDispatchToProps = {
    setUsers: setUsersAc,
    setCurPage: setCurPage,
    setTotalCount: setTotalCount,
    setIsFetching: setIsFetching,
    setIsFollowing: setIsFollowing,
    getUsersThunk: getUsersThunkCreator,
    unfollow: unfollow,
    follow: follow,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UsersApiComponent)