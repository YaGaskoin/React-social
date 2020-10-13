import React from 'react';
import logo from './logo.svg';
import css from './App.module.css';
import Header from './components/Header/Header';
import Navs from './components/Navs/Navs';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


function App(props) {
  return (
    <div className={css.app_wrapper}>
        <Header/>
        <Navs/>
        <div className={css.app_content_wrapper}>
            <Route path='/dialogs' component={DialogsContainer}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/music' component={Music}/>
            <Route path='/news' component={News}/>
            <Route path='/settings' component={Settings}/>
        </div>

    </div>

  );
}

export default App;
