import React from 'react';
import css from './App.module.css';
import Header from './components/Header/Header';
import Navs from './components/Navs/Navs';
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login";


function App(props) {
  return (
    <div className={css.app_wrapper}>
        <HeaderContainer/>
        <Navs/>
        <div className={css.app_content_wrapper}>
            <Route path='/dialogs' component={DialogsContainer}/>
            <Route path='/profile/:userId?' component={ProfileContainer}/>
            <Route path='/music' component={Music}/>
            <Route path='/news' component={News}/>
            <Route path='/settings' component={Settings}/>
            <Route path='/users' component={UsersContainer}/>
            <Route path='/login' component={Login}/>
        </div>

    </div>

  );
}

export default App;
