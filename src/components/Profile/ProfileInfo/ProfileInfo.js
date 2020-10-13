import React from "react";
import css from './ProfileInfo.module.css'


const ProfileInfo = (props) => {
    return (
        <div>
                    <img className={css.profile_header__img} src={props.header_img}/>

            <div className={css.profile_info}>
                ava + description
                <img className={css.profile_info__img} src={props.img}/>
                <div className={css.profile_info__text}>
                    {props.text}
                </div>
            </div>
            </div>
       )
}

export default ProfileInfo;