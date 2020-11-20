import React from "react";
import css from './Dialogs.module.css'
import UsersColumnItem from "./UsersColumnItem/UsersColumnItem";
import DialogItem from './DialogItem/DialogItem'
import {Redirect} from "react-router-dom";


const Dialogs = (props) => {

    let messageText = React.createRef()

    const addMessage = (e) => {
        e.preventDefault();
        props.addMessage();

    }
    const changeMessageText = (e) => {
        e.preventDefault();
        let text = messageText.current.value;
        props.updateMessageBody(text);

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
            <form>
                <textarea ref={messageText} value={props.messagesPage.newMessage}
                          onChange={changeMessageText}>

                </textarea>
                <button onClick={addMessage}>Отправить</button>
            </form>
        </div>
    )
}

export default Dialogs