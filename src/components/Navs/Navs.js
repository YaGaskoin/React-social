import React from "react";
import css from './Navs.module.css'
import {NavLink} from "react-router-dom";

const Navs =() => {
    return (<nav className={css.nav}>
            <NavLink to="/profile" activeClassName={css.active} className={css.nav_item}>
                Profile
            </NavLink>
            <NavLink to="/dialogs" activeClassName={css.active} className={css.nav_item}>
                Dialogs
            </NavLink >
            <NavLink to="/news" activeClassName={css.active} className={css.nav_item}>
                News
            </NavLink>
            <NavLink to="/music" activeClassName={css.active} className={css.nav_item}>
                Music
            </NavLink>
        <NavLink to="/settings" activeClassName={css.active} className={css.nav_item}>
                Settings
            </NavLink>
        </nav>)
}

export default Navs;