import React from "react";
import css from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/noimg.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ModalImage from "react-modal-image";
import ProfileDataFormRedux from "./ProfileDataForm";


const ProfileInfo = (props) => {


    if (!props.profile) {
        return <Preloader/>
    }

    const editProfile = (formData) => {
        props.updateUserInfo(formData)


    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return (

        <div>

            <div className={css.profile_info}>
                <h2>{props.profile.fullName}</h2>
                <div className={css.profile_photo}>
                {props.profile.photos.small?
                <ModalImage
                  small={props.profile.photos.large}
                  large={props.profile.photos.large}
                  alt="Profile photo"
                />: <img src={userPhoto} alt="Profile photo"/>}
                </div>

                {props.isOwner &&
                <input className={css.image_field} type={'file'} onChange={onMainPhotoSelected} />}
                <div className={css.profile_info_container}>
                 <ProfileStatusWithHooks profile={props.profile} status={props.status}
                                updateStatus={props.updateStatus}/>
                {props.editMode ?
                    <ProfileDataFormRedux {...props} initialValues={props.profile} onSubmit={editProfile} deactivateEditMode={()=>{props.setEditMode(false)}}/> :
                    <ProfileData {...props} activateEditMode={() => {
                        props.setEditMode(true);
                    }}/>}
                    </div>
            </div>
        </div>
    )
}

const ProfileData = (props) => {
    return <div className={css.profile_block}>

        <strong>Профиль</strong>
        <div className={css.lookjob_container}>
            {props.profile && props.profile.lookingForAJob ?
                <div className={css.lookjob}><span className={css.lookjob__field}>В поиске работы:
                    Да </span> <span className={css.lookjob__field}>Текст для соискателей: {props.profile.lookingForAJobDescription}</span>
                </div> : <div className={css.lookjob}><span className={css.lookjob__field}>В поиске работы: Нет</span></div>}
        </div>
        {props.profile.aboutMe && <div className={css.about_me}>Обо мне: {props.profile.aboutMe}</div>}
        <div>
            Контакты:<div className={css.contact__units}>{Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key}
                            contactValue={props.profile.contacts[key]}/>
        })}</div>
        </div>
        {props.isOwner &&
        <button onClick={props.activateEditMode}>Изменить</button>}
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <a href={contactValue} className={css.contact}><img className={css.contact_logo} src={logos[contactTitle]} alt={contactTitle}/><span className={css.contact_title}>{contactTitle}: {contactValue}</span></a>
}


const logos ={
    facebook: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-square2-512.png',
    website: 'https://www.freeiconspng.com/uploads/black-www-icon-17.png',
    vk: 'https://cdn.worldvectorlogo.com/logos/vk-1.svg',
    twitter: 'https://picklefeetgames.com/wp-content/uploads/2018/12/twitter-app-icon-transparent-17-2-300x300.png',
    instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png',
    youtube: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png',
    github: 'https://pngimg.com/uploads/github/github_PNG53.png',
    mainLink: 'https://cdn4.iconfinder.com/data/icons/miscellaneous-5-1/128/customizable_flexible_custom-512.png'




}

export default ProfileInfo;