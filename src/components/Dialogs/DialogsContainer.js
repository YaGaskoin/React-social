import React from "react";
import css from './Dialogs.module.css'
import UsersColumnItem from "./UsersColumnItem/UsersColumnItem";
import DialogItem from './DialogItem/DialogItem'
import {
    addMessageActionCreator,
    changeMessageActionCreator
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import connect from "react-redux/lib/connect/connect";


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateMessageBody: (body) => { dispatch(changeMessageActionCreator(body))},
        addMessage: () => {dispatch(addMessageActionCreator())}
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;