import React from "react";
import css from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }
    return (

        <div>
                    <img className={css.profile_header__img} src={props.header_img}/>

            <div className={css.profile_info}>
                <h2>{props.profile.fullName}</h2>
                <img className={css.profile_info__img} src={props.profile.photos.large}/>
               <ProfileStatusWithHooks profile={props.profile} status={props.status } updateStatus={props.updateStatus}/>
                <div>

                </div>
            </div>
            </div>
       )
}

export default ProfileInfo;