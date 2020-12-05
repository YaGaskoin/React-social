import React, {Suspense} from 'react';
import css from './App.module.css';
import Navs from './components/Navs/Navs';
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import {HashRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from "./components/Login/Login";
import {Provider, connect} from "react-redux";
import store from './redux/redux-store'
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert('error Occured')
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <div className={css.app_content_wrapper}><Preloader/></div>
        }
        return (
            <div className={css.app_wrapper}>
                <HeaderContainer/>
                <Navs/>
                <div className={css.app_content_wrapper}>
                    <Route path={'/'} exact={true} render={withSuspense(ProfileContainer)}/>
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)
                    }/>
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users' component={UsersContainer}/>
                    <Route path='/login' component={Login}/>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}
let AppContainer = compose(
    connect(mapStateToProps, {initializeApp}), withRouter
)(App)

let SamuraiJSApp = props => {
    return <HashRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp