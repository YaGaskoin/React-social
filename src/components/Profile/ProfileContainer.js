import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPostActionCreator,
    changePostActionCreator, editUserInfo,
    getProfile,
    getStatus,
    savePhoto, setEditModeAc,
    setUserProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    getUser() {
        let userId = this.props.match.params.userId
        if (!userId) {
            if(this.props.curLoginedId){
                userId = this.props.curLoginedId;
            }

        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }


    componentDidMount() {
       this.getUser();
    }

    componentWillUnmount() {
        this.props.setEditMode(false);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId){
            this.getUser();
        }

    }

    render() {
        if(!this.props.isAuth && !this.props.match.params.userId) return <Redirect to={'/login'}/>
        return <div>
            <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
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
        curLoginedId: state.auth.userId,
        editMode: state.profilePage.editMode,
    }
}

let mapDispatchToProps = {

    setProfile: setUserProfile,
    addPost: addPostActionCreator,
    changePost: changePostActionCreator,
    getProfile: getProfile,
    getStatus: getStatus,
    updateStatus: updateStatus,
    savePhoto: savePhoto,
    updateUserInfo: editUserInfo,
    setEditMode: setEditModeAc,
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer)