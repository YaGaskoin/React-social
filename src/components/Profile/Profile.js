import React from "react";
import css from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} updateStatus={props.updateStatus} status={props.status} />
            <MyPostsContainer/>
        </div>)
}

export default Profile;