import {authAPI, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SET_USER_DATA = 'SET_USER_DATA';


export type InitialStateType = {
    id: number | null,
    email: string | null,
    login:  string | null,
    isAuth: boolean
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA :
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

type ActionsType =  SetAuthUserDataActionType


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


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.authMe()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email:string, password:string, rememberMe:boolean):ThunkType => async (dispatch:any) => {
    let loginData = await authAPI.login(email, password, rememberMe)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;