import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPostActionCreator,
    changePostActionCreator,
    getProfile,
    getStatus,
    setUserProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2;
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);


    }

    render() {
        return <div>
            <Profile {...this.props}/>
        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPost: state.profilePage.newPost,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status
    }
}

let mapDispatchToProps = {

    setProfile: setUserProfile,
    addPost: addPostActionCreator,
    changePost: changePostActionCreator,
    getProfile: getProfile,
    getStatus: getStatus,
    updateStatus: updateStatus
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ProfileContainer)