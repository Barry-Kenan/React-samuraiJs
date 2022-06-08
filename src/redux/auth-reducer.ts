import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";


export type InitialStateType = {
    id: number | null,
    email: string | null,
    login:  string | null,
    isAuth: boolean
    captchaUrl : string | null
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA' :
        case 'GET_CAPTCHA_URL_SUCCESS' :
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export const actions = {
    setAuthUserData: (id:number | null , email:string | null, login:string | null, isAuth:boolean) => (
        {type: 'SET_USER_DATA', payload: {id, email, login, isAuth}} as const
    ),
    getCaptchaUrlSuccess: (captchaUrl:string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}


export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}


export const login = (email:string, password:string, rememberMe:boolean, captcha:string|null):ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;