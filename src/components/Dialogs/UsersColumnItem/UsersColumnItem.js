import css from "./UsersColumnItem.module.css";
import React from "react";
import {NavLink} from "react-router-dom";


const UsersColumnItem = (props) => {
    return(
        <div className={css.users_column__item}>
            <NavLink activeClassName={css.active} to={'/dialogs/' + props.id}>{props.name} </NavLink>
            </div>
    )
}
export default UsersColumnItem