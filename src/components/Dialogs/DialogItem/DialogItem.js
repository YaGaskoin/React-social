import css from "../Dialogs.module.css";
import React from "react";

const DialogItem =(props) => {
    return (
        <div className={css.dialogs_items__message}>
            {props.text}
            </div>
    )
}

export default DialogItem