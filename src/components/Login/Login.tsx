import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, InputField} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators";
import {useDispatch, useSelector} from "react-redux";
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
                {createField<LoginFormValuesTypeKeys>("Email","email",[required],InputField)}
                {createField<LoginFormValuesTypeKeys>("Password","password",[required],InputField, {type : "password"})}
                {createField<LoginFormValuesTypeKeys>(undefined,"rememberMe",[],InputField, {type:"checkbox"}, "Remember me")}
                {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image","captcha",[required],InputField)}

                {error && <div className={s.formSummaryError}>{error}</div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm =  reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)



export type LoginFormValuesType = {
    captcha:string
    rememberMe: boolean
    email: string
    password:string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>



export const Login: React.FC = () => {

    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if(isAuth){
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}
