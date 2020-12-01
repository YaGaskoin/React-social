import React from "react";
import css from './Dialogs.module.css'
import UsersColumnItem from "./UsersColumnItem/UsersColumnItem";
import DialogItem from './DialogItem/DialogItem'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLength, requiredField} from "../../utils/validators/validators";


const maxLength50 = maxLength(50);

const DialogForm = (props) => {
    return(
     <form onSubmit={props.handleSubmit}>
         <Field component={Textarea} name={'messageText'} placeholder={'Введите сообщение'} validate={[requiredField, maxLength50]}/>
                <button>Отправить</button>
            </form>)
}

const ReduxDialogForm = reduxForm({
    form: 'dialogMessage'
})(DialogForm);

const Dialogs = (props) => {


    const addMessage = (formData) => {
        props.addMessage(formData.messageText);

    }

    let usersComponents = props.messagesPage.usersData.map((user) => {
        return (
            <UsersColumnItem key={user.id} name={user.name} id={user.id}/>
        )
    })

    let usersMessages = props.messagesPage.usersMessages.map((message) => {
        return(
            <DialogItem key={message.id} text={message.text}/>
        )
    })
    return (
        <div className={css.dialogs}>
            <div className={css.users_column}>
                {usersComponents}
            </div>
            <div className={css.dialog_items}>
                {usersMessages}
            </div>
            <ReduxDialogForm onSubmit={addMessage}/>
        </div>
    )
}

export default Dialogs