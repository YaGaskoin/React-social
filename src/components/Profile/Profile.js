import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} editMode={props.editMode} setEditMode={props.setEditMode}
                         updateStatus={props.updateStatus} updateUserInfo={props.updateUserInfo}
                         status={props.status} isOwner={props.isOwner} savePhoto={props.savePhoto}/>
            <MyPostsContainer/>
        </div>)
}

export default Profile;