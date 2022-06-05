import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import s from "../common/FormControls/FormControls.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl:string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>("Email","email",[required],Input)}
                {createField<LoginFormValuesTypeKeys>("Password","password",[required],Input, {type : "password"})}
                {createField<LoginFormValuesTypeKeys>(undefined,"rememberMe",[],Input, {type:"checkbox"}, "Remember me")}
                {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image","captcha",[required],Input)}

                {error && <div className={s.formSummaryError}>{error}</div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm =  reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string)=>void
}

export type LoginFormValuesType = {
    captcha:string
    rememberMe: boolean
    email: string
    password:string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth){
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}


const mapStateToProps = (state:AppStateType):MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login);