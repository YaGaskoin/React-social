import React from "react";
import css from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from '../../assets/images/pngegg.png'

const Header = (props) =>{
    return ( <header className={css['header']}>

        <img class={css.header_logo} src={logo}/>
      <div className={css.loginBlock}>
          {props.isAuth? <div>{props.login} - <button onClick={props.logout}>Logout</button></div> : <NavLink to={'/login'}>Login</NavLink>}

      </div>
    </header>)
}

export default Header