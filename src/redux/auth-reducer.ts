import {authAPI, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


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
        case SET_USER_DATA :
        case GET_CAPTCHA_URL_SUCCESS :
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

type ActionsType =  SetAuthUserDataActionType | GetCaptchaUrlSuccessType


type SetAuthUserDataPayloadActionType = {
    id:number | null
    email:string | null
    login:string | null
    isAuth:boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadActionType
}

export const setAuthUserData = (id:number | null , email:string | null, login:string | null, isAuth:boolean): SetAuthUserDataActionType => {
    return {type: SET_USER_DATA, payload: {id, email, login, isAuth}}
}

type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaUrl: string | null
    }
}
export const getCaptchaUrlSuccess = (captchaUrl:string) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}}
}




type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email:string, password:string, rememberMe:boolean, captcha:string|null):ThunkType => async (dispatch:any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if(loginData.resultCode === ResultCodesEnum.Captcha){
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch:any) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}


export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;