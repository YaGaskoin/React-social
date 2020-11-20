import React from 'react'
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {getUserData, setUserDataAc} from "../../redux/auth-reducer";
import {authApi} from "../../api/api";

class HeaderContainer extends React.Component{

    componentDidMount() {
        this.props.getUserData();
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

const mapDispatchToProps = {
   getUserData: getUserData
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)