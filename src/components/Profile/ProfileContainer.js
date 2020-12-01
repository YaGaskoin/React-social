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
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            if(this.props.curLoginedId){
                userId = this.props.curLoginedId;
            }

        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);


    }

    render() {
        if(!this.props.isAuth && !this.props.match.params.userId) return <Redirect to={'/login'}/>
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
        status: state.profilePage.status,
        curLoginedId: state.auth.userId
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
    withRouter
)(ProfileContainer)