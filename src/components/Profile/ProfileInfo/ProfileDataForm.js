import React from "react";
import css from './ProfileInfo.module.css'
import {
    createFieldAdvanced,
} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {isUrl} from "../../../utils/validators/validators";

export const ProfileDataForm = (props) => {
    return <div className={css.profile_block}>
        <strong className={css.title}>Профиль</strong>
        <form onSubmit={props.handleSubmit}>

            <label>Полное имя</label><br/>
            {createFieldAdvanced({name:'fullName', value:props.profile.fullName})}<br/>
            {createFieldAdvanced({name:'userId', value:props.curLoginedId, component:'input', type:'hidden'})}
            <label>В поиске работы:</label><br/>
            {createFieldAdvanced({name:'lookingForAJob', value:props.profile.lookingForAJob, component:'input', type:'checkbox'})}<br/>
            <label>Текст для соискателей:</label><br/>
            {createFieldAdvanced({name:'lookingForAJobDescription', value:props.profile.lookingForAJobDescription, component:'textarea'})}<br/>
            <label>Обо мне:</label><br/>
            {createFieldAdvanced({name:'aboutMe', value:props.profile.aboutMe, component:'textarea'})}<br/>
            {Object.keys(props.profile.contacts).map((key) => {
                return <div>{key}: {createFieldAdvanced({name:'contacts.' + key, value:props.profile.contacts[key], validators:[isUrl]})}</div>
            })}
            <br/>
            <button>Сохранить</button> <button onClick={props.deactivateEditMode}>Отменить</button>

        </form>
        {props.error && <div className={css.summary_error}>
            {props.error}
            </div>}
    </div>
}
const ProfileDataFormRedux = reduxForm(
    {
        form: 'editProfile'
    })(ProfileDataForm);

export default ProfileDataFormRedux;