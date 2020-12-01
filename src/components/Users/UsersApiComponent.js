import React from 'react'
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


class UsersApiComponent extends React.Component{

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    changePage = (page) => {
       this.props.getUsersThunk(page, this.props.pageSize);
       this.props.setCurPage(page);
    }


    render() {
       return <>
           {this.props.isFetching ? <Preloader /> : null}<Users
           totalUsersCount={this.props.totalUsersCount}
           pageSize={this.props.pageSize}
           currentPage={this.props.currentPage}
           unfollow={this.props.unfollow}
           follow={this.props.follow}
           changePage={this.changePage}
           setIsFollowing={this.props.setIsFollowing}
           users={this.props.users}
           followingInProgress={this.props.followingInProgress}
       />
       </>
    }
}

export default UsersApiComponent;