import {
    addMessageActionCreator,
    changeMessageActionCreator
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import React from "react";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateMessageBody: (body) => { dispatch(changeMessageActionCreator(body))},
        addMessage: () => {dispatch(addMessageActionCreator())}
    }
}




export default compose( connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);