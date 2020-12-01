import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredField} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import css from "../common/FormsControls/FormsControls.module.css"

const LoginForm =({handleSubmit, error}) => {
    return  <form onSubmit={handleSubmit}>
            <div>{createField('Login', 'email',
                [requiredField], Input)}</div>
            <div>{createField('Password', 'password',
                [requiredField], Input, 'password')}</div>
            <div><Field component={Input}
                        name={'rememberMe'} type={'checkbox'}/> remember me</div>
        {error && <div className={css.summary_error}>
            {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
}

const LoginReduxForm = reduxForm ({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
       props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth){
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
       <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


export default connect(mapStateToProps, {login})(Login);